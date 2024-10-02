import React, { createContext, useEffect, useState } from "react";
import { decodeToken, User } from "../utils/auth";

interface AuthContextProps {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      const user = decodeToken(token);
      if (user) {
        setUser(user as User);
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    setLoading(true);
    localStorage.setItem("token", token);
    const user = decodeToken(token);
    if (user) {
      setUser(user as User);
    }
    setLoading(false); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
