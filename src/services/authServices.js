import api from "../axios";
import { authState } from "../auth";

export const login = async (email, password) => {
  try {
    await api.get("/sanctum/csrf-cookie");

    const response = await api.post("/login", {
      email,
      password,
    });

    console.log("Login berhasil!", response.data);

    const user = await api.get("/users");
    authState.user = response.data;
    authState.token = "1";
    authState.isLoggedIn = true;
    localStorage.setItem("token", "1");
    console.log("User yang login:", user.data);
    return user.data;
  } catch (error) {
    console.error("Gagal login:", error.response?.data || error.message);
    throw error;
  }
};
