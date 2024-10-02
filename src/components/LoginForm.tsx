import { Box, Button, TextField, Typography } from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
  
  const { values, setValues, error, handleSubmit } = useLoginForm();

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
        Iniciar sesión
      </Button>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};
