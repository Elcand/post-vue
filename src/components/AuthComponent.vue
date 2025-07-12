<template>
  <div>
    <div v-if="auth.isLoggedIn">
      Halo, {{ auth.user?.name }}!
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import api from "../axios";
import { useRouter } from "vue-router";

const auth = inject("auth");
const router = useRouter();

const logout = async () => {
  await api.post("/logout");
  auth.user = null;
  auth.token = null;
  auth.isLoggedIn = false;
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
