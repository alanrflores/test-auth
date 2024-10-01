import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido a la aplicación de ejemplo de roles
      </Typography>
      <Typography variant="body1" gutterBottom>
        Esta aplicación de ejemplo muestra cómo se pueden implementar roles en
        una aplicación web.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
    </Box>
  );
};
