import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { login } from "../utils/auth";

interface LoginFormValues {
  username: string;
  password: string;
}

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validateValues = (values: LoginFormValues) => {
    if (values.username === "" || values.password === "") {
      setError("Por favor, rellena todos los campos");
      return false;
    }
    if (values.password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!validateValues(values)) return;

      const token = await login(
        values.username.toLocaleLowerCase(),
        values.password
      );
      if (token) {
        authLogin(token);
        navigate("/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión");
    }
  };

  return {
    values,
    setValues,
    error,
    handleSubmit,
  };
};
