<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg py-9 mt-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
      <hr />
      <form @submit.prevent="handleLogin">
        <div class="text-center m-2 px-4">
          <div class="m-4 p-4 space-y-8">
            <div class="mx-6">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-full h-[40px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div class="mx-6">
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full h-[40px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <hr />
          <div class="mt-5">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../services/authServices";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const user = await login(email.value, password.value);
    console.log("User berhasil login:", user);
  } catch (err) {
    alert("Login gagal. Cek email & password.");
  }
};
</script>
