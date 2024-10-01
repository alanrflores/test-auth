import { Box, Paper, Typography } from "@mui/material";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Sing in
        </Typography>

        <LoginForm />
      </Paper>
    </Box>
  );
};
