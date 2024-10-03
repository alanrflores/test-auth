import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  isLocal?: boolean;
}

const api = axios.create({
  baseURL:
    import.meta.env.VITE_APP_BASE_URL || "https://jsonplaceholder.typicode.com",
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

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    const apiPosts: Post[] = response.data;
    const localPosts = getLocalPosts();
    // const localUpdates = getLocalUpdates();
    const localIds = new Set(localPosts.map((post) => post.id));

    const combinedPosts = [
      ...apiPosts.filter((post) => !localIds.has(post.id)),
      ...localPosts.map((post) => ({ ...post, isLocal: true })),
    ];
    // console.log({ combinedPosts });

    return combinedPosts;
  } catch (error) {
    console.log(error);
    return [...getLocalPosts().map((post) => ({ ...post, isLocal: true }))];
  }
};

const getNextId = (): number => {
  const localPosts = getLocalPosts();
  // Verifico que haya posts locales, si no, comienza con ID 101
  if (localPosts.length === 0) {
    console.log("No hay posts locales, comienza desde ID 101");
    return 101;
  }

  const highestId = Math.max(...localPosts.map((post) => post.id || 0));

  return highestId + 1 > 100 ? highestId + 1 : 101;
};

export const createPost = async (post: Post): Promise<Post | null> => {
  try {
    const response = await api.post("/posts", post);
    const newPost: Post = response.data;

    const localPosts = getLocalPosts();
    newPost.id = getNextId(); // Siempre incrementar el ID basándose en los posts locales

    const updatedLocalPosts = [...localPosts, newPost];

    setLocalPosts(updatedLocalPosts);
    return newPost; // Post creado en la API y actualizado localmente
  } catch (error) {
    console.log("Error al crear post en la API:", error);
    return null; // Manejo el error de la API
  }
};

export const updatePost = async (
  id: number,
  data: { title: string; body: string; userId: number; isLocal?: boolean }
) => {
  const { title, body, userId, isLocal } = data;

 
  if (isLocal) {
    const localPosts = getLocalPosts();
    const updatedLocalPosts = localPosts.map((post) =>
      post.id === id ? { ...post, ...data } : post
    );
    setLocalPosts(updatedLocalPosts);

    return { id, ...data };
  }

  try {
    const response = await api.put(`/posts/${id}`, { title, body, userId });
    const updatedPost: Post = response.data;

    const localPosts = getLocalPosts();
    const updatedLocalPosts = localPosts.map((post) =>
      post.id === id ? { ...post, ...updatedPost } : post
    );

    setLocalPosts(updatedLocalPosts);
    return updatedLocalPosts;
  } catch (error) {
    // Si falla la llamada a la API, actualizo solo localmente
    const localPosts = getLocalPosts();
    const updatedLocalPosts = localPosts.map((post) =>
      post.id === id ? { ...post, ...data } : post
    );
    setLocalPosts(updatedLocalPosts);

    return { id, ...data };
  }
};


export const deletePost = async (
  id: number,
  isLocal: boolean = false
): Promise<boolean | undefined> => {
  try {
    // Si el post es local, no llamo a la API, solo lo elimino localmente
    if (isLocal) {
      const localPosts = getLocalPosts().filter((post) => post.id !== id);
      setLocalPosts(localPosts);
      return true;
    }

    const result = await api.delete(`/posts/${id}`);
    // console.log({ result });

    if (result.status === 200) {
      const localPosts = getLocalPosts().filter((post) => post.id !== id);
      setLocalPosts(localPosts);
      return true;
    }
  } catch (error) {
    console.log("Error eliminando post en la API:", error);
    return false;
  }
};
