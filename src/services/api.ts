import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPost = async (post: Post) => {
  try {
    const response = await api.post("/posts", post);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateData = async (id: number, data: Post) => {
  try {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
