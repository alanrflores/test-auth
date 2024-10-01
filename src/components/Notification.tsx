import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  severity: "success" | "error" | "info" | "warning";
  message: string;
}

export const Notification = ({
  open,
  onClose,
  severity,
  message,
}: NotificationProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
