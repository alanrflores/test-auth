import React from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Post } from "../services/api";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useFormData from "../hooks/useFormData";
interface DataFormProps {
  onSubmit: (data: Omit<Post, "id"> & { id?: number | undefined }) => void;
  initialData?: Post;
}

export const DataForm = ({ onSubmit, initialData }: DataFormProps) => {
  const { formData, handleChange, handleUserIdChange, handleSubmit } = useFormData({ initialData, onSubmit });

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        id="title"
        label="Título"
        variant="outlined"
        value={formData.title}
        name="title"
        onChange={handleChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        id="body"
        label="Contenido"
        variant="outlined"
        value={formData.body}
        multiline
        rows={4}
        name="body"
        onChange={handleChange}
        required
      />

      <Box display="flex" alignItems="center" marginY={2}>
        <TextField
          label="Usuario ID"
          variant="outlined"
          value={formData.userId}
          InputProps={{
            readOnly: true,
          }}
          sx={{ width: "100px", marginRight: 2 }}
        />
        <IconButton
          onClick={() => handleUserIdChange(true)}
          disabled={formData.userId >= 10}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          onClick={() => handleUserIdChange(false)}
          disabled={formData.userId <= 1}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
        {initialData ? "Actualizar" : "Crear"}
      </Button>
    </Box>
  );
};
