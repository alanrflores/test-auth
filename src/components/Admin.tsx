import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { DataForm } from "./DataForm";
import { DataTable } from "./DataTable";
import { Notification } from "./Notification";
import { usePosts } from "../hooks/usePost";

export const Admin: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCloseNotification,
    notification,
    editingItem,
    setEditingItem,
  } = usePosts();

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;
   
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de Administración
        </Typography>
        <DataForm onSubmit={handleSubmit} initialData={editingItem} />
        {editingItem && (
          <Button onClick={() => setEditingItem(undefined)} sx={{ mt: 2 }}>
            Cancelar Edición
          </Button>
        )}
        <DataTable
          data={data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Box>
    </Container>
  );
};
