import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createPost, getPosts, updatePost, deletePost, Post } from "../services/api";

type SeverityType = "info" | "success" | "error" | "warning";

interface NotificationProps {
  open: boolean;
  severity: SeverityType;
  message: string;
}

interface UsePostsReturn {
  data: Post[] | undefined;
  refetch: () => void;
  isLoading: boolean;
  error: unknown;
  editingItem: Post | undefined;
  setEditingItem: (item: Post | undefined) => void;
  notification: NotificationProps;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleSubmit: (formData: Omit<Post, "id"> & { id?: number }) => void;
  handleCloseNotification: () => void;
}

export const usePosts = (): UsePostsReturn => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<Post | undefined>();
  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    severity: "info",
    message: "",
  });

  const { data, isLoading, error, refetch } = useQuery("posts", getPosts);

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      refetch();
      showNotification("success", "El post se ha creado correctamente");
    },
    onError: () => {
      showNotification("error", "Error al crear el post");
    },
  });

// Mutación para actualizar el post
const updateMutation = useMutation(
  (updatedPost: Post) => {
    // Validar si el post tiene un ID antes de intentar actualizarlo
    if (!updatedPost || typeof updatedPost.id === "undefined") {
      throw new Error("Invalid post data for update");
    }
    const { id, ...postData } = updatedPost;
    return updatePost(id, postData);
  },
  {
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      refetch();
      setEditingItem(undefined);
      showNotification("success", "El post se ha actualizado correctamente");
    },
    onError: (error) => {
      showNotification("error", `Error al actualizar post: ${(error as Error).message}`);
    },
  }
);
  

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      refetch(); 
      showNotification("success", "El post se ha eliminado correctamente");
    },
    onError: () => {
      showNotification("error", "Error al eliminar el post");
    },
  });

  const handleEdit = (id: number) => {
    const item = data?.find((item: Post) => item.id === id);
    if (item) {
      setEditingItem(item);
    } else {
      showNotification("error", "No se encontró el post para editar");
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (formData: Omit<Post, "id"> & { id?: number }) => {
    if (formData.id) {
      updateMutation.mutate(formData as Post);
    } else {
      createMutation.mutate(formData as Post);
    }
  };

  const showNotification = (severity: SeverityType, message: string) => {
    setNotification({ open: true, severity, message });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return {
    data,
    refetch,
    isLoading,
    error,
    editingItem,
    setEditingItem,
    notification,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCloseNotification,
  };
};