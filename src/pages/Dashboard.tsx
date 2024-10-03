import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataTable } from "../components/DataTable";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { Notification } from "../components/Notification";
import { getPosts } from "../services/api";
import { Admin } from "../components/Admin";

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery("posts", getPosts);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info" as "info" | "success" | "error" | "warning",
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;

  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Has iniciado sesión como {user?.role}.
      </Typography>
      {user?.role === "admin" 
      ? (<Admin />) 
      : user?.role === "user" 
      ? (<>
          <DataTable
            data={data ?? []}
          />
          <Notification
            open={notification.open}
            message={notification.message}
            severity={notification.severity}
            onClose={() => setNotification({ ...notification, open: false })}
          />
        </>) 
        : (<Typography>No tienes permisos para acceder a esta página</Typography>)}
    </Box>
  );
};
