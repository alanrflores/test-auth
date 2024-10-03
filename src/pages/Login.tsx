import { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const {user, loading} = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  if(loading) return <Typography>Loading...</Typography>;
  
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!user ? (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Iniciar sesión
        </Typography>

         <LoginForm />
      </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
           <Typography variant="h6" component="h2" gutterBottom align="center">
            No te olvides de cerrar tu sesión para ingresar con otra cuenta.
          </Typography>

          </Paper>
      )}
    </Box>
  );
};
