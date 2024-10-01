import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { login } from "../utils/auth";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = await login(values.username, values.password);
    if (token) {
      authLogin(token);
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        fullWidth
        id="username"
        name="username"
        label="Usuario"
        autoComplete="username"
        autoFocus
        required
        value={values.username}
        onChange={(e) => setValues({ ...values, username: e.target.value })}
      />
      <TextField
        margin="normal"
        fullWidth
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        required
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign in
      </Button>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};
