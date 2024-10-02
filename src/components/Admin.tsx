import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createPost,
  getPosts,
  Post,
  updatePost,
  deletePost,
} from "../services/api";
import { DataForm } from "./DataForm";
import { DataTable } from "./DataTable";
import { Notification } from "./Notification";

export type SeverityType = "info" | "success" | "error" | "warning";

interface NotificationProps {
  open: boolean;
  severity: SeverityType;
  message: string;
}

export const Admin: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<Post | undefined>();
  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    severity: "info",
    message: "",
  });

  const { data, isLoading, error } = useQuery("posts", getPosts);

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      showNotification("success", "Post created successfully");
    },
    onError: () => {
      showNotification("error", "Error creating post");
    },
  });

  const updateMutation = useMutation(
    (updatedPost: Post) => updatePost(updatedPost?.id, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        setEditingItem(undefined);
        showNotification("success", "Post updated successfully");
      },
      onError: () => {
        showNotification("error", "Error updating post");
      },
    }
  );

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      showNotification("success", "Post deleted successfully");
    },
    onError: () => {
      showNotification("error", "Error deleting post");
    },
  });

  const handleEdit = (id: number) => {
    const item = data?.find((item: Post) => item.id === id);
    if (item) {
      setEditingItem(item);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (severity: SeverityType, message: string) => {
    setNotification({ open: true, severity, message });
  };

  const handleSubmit = (formData: Omit<Post, "id"> & { id?: number }) => {
    if (formData.id) {
      updateMutation.mutate(formData as Post);
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">Error: {(error as Error).message}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de administrador
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {editingItem ? "Editar post" : "Crear nuevo post"}
          </Typography>
          <DataForm onSubmit={handleSubmit} initialData={editingItem} />
          {editingItem && (
            <Button
              onClick={() => setEditingItem(undefined)}
              sx={{ mt: 2 }}
              variant="outlined"
            >
              Cancelar
            </Button>
          )}
        </Paper>
        <DataTable
          data={data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Container>
  );
};
