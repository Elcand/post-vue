import axios from "axios";
import { env } from "./config/env.js";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const api = axios.create({
  baseURL: env.apiBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");
  const xsrfToken = getCookie("XSRF-TOKEN");

  if (accessToken) {
    const isFormData = config.data instanceof FormData;

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };
  }

  if (xsrfToken && ["post", "put", "delete", "patch"].includes(config.method)) {
    config.headers = {
      ...config.headers,
      "X-XSRF-TOKEN": xsrfToken,
    };
  }

  return config;
});

export default api;
