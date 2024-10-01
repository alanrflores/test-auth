import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface DataFormProps {
  onSubmit: (data: { title: string; body: string }) => void;
  initialData?: { title: string; body: string };
}

export const DataForm = ({ onSubmit, initialData }: DataFormProps) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, body);
    onSubmit({ title, body });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        id="title"
        label="Título"
        variant="outlined"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        id="body"
        label="Contenido"
        variant="outlined"
        value={body}
        multiline
        rows={4}
        name="body"
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
        {initialData ? "Actualizar" : "Crear"}
      </Button>
    </Box>
  )
};
