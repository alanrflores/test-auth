import { jwtDecode } from "jwt-decode";
export interface User {
  id: number;
  username: string;
  //   email: string;
  role: "admin" | "user";
}

const userAdmin = import.meta.env.VITE_USER_ADMIN || "";
const userAdminPassword = import.meta.env.VITE_USER_ADMIN_PASSWORD || "";
const user = import.meta.env.VITE_USER || "";
const userPassword = import.meta.env.VITE_USER_PASSWORD || "";

export const decodeToken = (token: string) => {
  try {
    const decodedToken = jwtDecode<User>(token);
    return decodedToken;
  } catch (error) {
    console.error("Token inválido", error);
    return null;
  }
};

export const login = async (username: string, password: string) => {
  if (username === userAdmin && password === userAdminPassword) {
    const token =  import.meta.env.VITE_TOKEN_ADMIN || "";
    const decodedAdmin = decodeToken(token);
    // console.log({ decodedAdmin });
    return token;
  } else if (username === user && password === userPassword) {
    const token =  import.meta.env.VITE_TOKEN_USER || "";
    const decodedUser = decodeToken(token);
    // console.log({ decodedUser });
    return token;
  }
  return null;
};
