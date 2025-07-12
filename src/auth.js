import { reactive } from "vue";

export const authState = reactive({
  user: null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: localStorage.getItem("token"),
});
