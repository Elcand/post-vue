import axios from "axios";
import { env } from "./config/env.js";

const api = axios.create({
  baseURL: env.apiBaseURL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
  timeout: 10000,
});

export default api;
