import { jwtDecode } from "jwt-decode";
export interface User {
  id: number;
  username: string;
  //   email: string;
  role: "admin" | "user";
}

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
  if (username === "diego" && password === "admin") {
    const token =  import.meta.env.VITE_TOKEN_ADMIN || "";
    const decodedAdmin = decodeToken(token);
    // console.log({ decodedAdmin });
    return token;
  } else if (username === "natalia" && password === "user") {
    const token =  import.meta.env.VITE_TOKEN_USER || "";
    const decodedUser = decodeToken(token);
    // console.log({ decodedUser });
    return token;
  }
  return null;
};
