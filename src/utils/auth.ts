import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET || "secret";

export interface User {
  id: number;
  username: string;
  //   email: string;
  role: "admin" | "user";
}

export const generateToken = (user: User) => {
  return jwt.sign(user, JWT_SECRET as string, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (username: string, password: string) => {
  if (username === "admin" && password === "password") {
    const user: User = {
      id: 1,
      username: "admin",
      role: "admin",
    };
    return generateToken(user);
  } else if (username === "user" && password === "password") {
    const user: User = {
      id: 2,
      username: "user",
      role: "user",
    };
    return generateToken(user);
  }
  return null;
};
