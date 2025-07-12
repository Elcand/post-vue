<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide, onMounted } from "vue";
import { authState } from "./auth";
import api from "./axios";

provide("auth", authState);

onMounted(async () => {
  if (authState.token) {
    try {
      const res = await api.get("/users");
      authState.user = res.data;
      authState.isLoggedIn = true;
    } catch {
      authState.token = null;
      authState.isLoggedIn = false;
    }
  }
});
</script>
