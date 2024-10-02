import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  // console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ borderRadius: 2, backgroundColor: "black", color: "white" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginX: 1,
          }}
        >
          <Typography variant="h6" component="div" sx={{}}>
            PRUEBA DE ROLES
          </Typography>
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ mr: 4 }}>
                {user.username.toLocaleUpperCase()}
              </Typography>
              <Button
                color="inherit"
                sx={{
                  fontSize: 14,
                  fontWeight: "600",
                  borderRadius: 1,
                  padding: "6px 12px",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </Box>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{
                  fontSize: 14,
                  fontWeight: "600",
                  borderRadius: 1,
                  padding: "6px 12px",
                  backgroundColor: "white",
                  color: "black",
                }}
                 onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
};
