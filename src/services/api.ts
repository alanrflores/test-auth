import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "https://jsonplaceholder.typicode.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getLocalPosts = (): Post[] => {
  const localPosts = localStorage.getItem("localPosts");
  return localPosts ? JSON.parse(localPosts) : [];
};

const setLocalPosts = (posts: Post[]) => {
  localStorage.setItem("localPosts", JSON.stringify(posts));
};

const getLocalUpdates = (): Record<number, Post> => {
  const localUpdates = localStorage.getItem("localUpdates");
  return localUpdates ? JSON.parse(localUpdates) : {};
};


const setLocalUpdates = (updates: Record<number, Post>) => {
  localStorage.setItem("localUpdates", JSON.stringify(updates));
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get("/posts");
    const apiPosts: Post[] = response.data;
    const localPosts = getLocalPosts();
    const localUpdates = getLocalUpdates();

    const combinedPosts = [
      ...apiPosts.map(post => localUpdates[post.id] || post),
      ...localPosts,
    ];
    return combinedPosts;
  } catch (error) {
    console.log(error);
    return [...getLocalPosts(), ...Object.values(getLocalUpdates())];
  }
};

const getHighestId = (): number => {
  const localPosts = getLocalPosts();
  const highestLocalId = localPosts.length > 0 ? Math.max(...localPosts.map(post => post.id)) : 0;
  return Math.max(highestLocalId, 100); // asumo que la API inicia con un ID de 100
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post | null> => {
  try {
    const response = await api.post("/posts", post);
    const newPost: Post = response.data;

    // si el ID no es valido, lo cambio a uno valido
    if (!newPost.id || newPost.id <= getHighestId()) {
      newPost.id = getHighestId() + 1;
    }

    const localPosts = getLocalPosts();
    const updatedLocalPosts = [...localPosts, newPost];
    setLocalPosts(updatedLocalPosts);

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);

    const newId = getHighestId() + 1;
    const newLocalPost: Post = { ...post, id: newId };
    
    const localPosts = getLocalPosts();
    setLocalPosts([...localPosts, newLocalPost]);

    return newLocalPost;
  }
};

export const updatePost = async (id: number, data: { title: string; body: string, userId:number }) => {
  try {
    const response = await api.put(`/posts/${id}`, data);
    const updatedPost: Post = response.data;

    const localUpdates = getLocalUpdates();
    localUpdates[id] = {...localUpdates[id], ...updatedPost};
    setLocalUpdates(localUpdates);

    return updatedPost;
 
  } catch (error) {
    console.log(error);
    
    const localUpdates = getLocalUpdates();
    const existingPost = localUpdates[id] || {id, title: "", body: "", userId: 1};
    const updateLocalPosts: Post = {...existingPost, ...data};
    localUpdates[id] = updateLocalPosts;
    setLocalUpdates(localUpdates);

    return updateLocalPosts;
  }
};

export const deletePost = async (id: number): Promise<boolean> => {
  try {

    await api.delete(`/posts/${id}`);

    const localPosts = getLocalPosts().filter(post => post.id !== id);
    setLocalPosts(localPosts);

    const localUpdates = getLocalUpdates();
    delete localUpdates[id];
    setLocalUpdates(localUpdates);

    return true;
  } catch (error) {

    const localUpdates = getLocalUpdates();
    localUpdates[id] = { ...localUpdates[id] };
    setLocalUpdates(localUpdates);

    return true;
  }
};
