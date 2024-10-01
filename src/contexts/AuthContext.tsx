import React, { createContext, useEffect, useState } from "react";
import { User,  verifyToken } from "../utils/auth";

interface AuthContextProps {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = verifyToken(token);
      if (user) {
        setUser(user);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const user = verifyToken(token);
    if (user) setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
