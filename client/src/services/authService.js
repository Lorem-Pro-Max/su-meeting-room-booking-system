import { api } from "./api";

export const loginService = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  console.log(response.data);
  return response.data;
};

export const logoutService = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
