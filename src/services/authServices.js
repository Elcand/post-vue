import api from "../axios";

export const login = async (email, password) => {
  try {
    // Ambil CSRF token dari Laravel
    await api.get("http://localhost:8000/api/sanctum/csrf-cookie");

    // Kirim request login
    const response = await api.post("/login", {
      email,
      password,
    });

    console.log("Login berhasil!", response.data);

    // Optional: ambil data user
    const user = await api.get("/api/user");
    return user.data;
  } catch (error) {
    console.error("Gagal login:", error.response?.data || error.message);
    throw error;
  }
};
