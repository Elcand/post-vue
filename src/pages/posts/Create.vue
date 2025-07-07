<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-xl bg-white rounded-lg shadow-lg px-9 mt-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Post
      </h1>
      <hr />
      <form class="space-y-2 mt-4" @submit.prevent="submitForm">
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Title</label
          >
          <input
            type="text"
            v-model="form.title"
            placeholder="Enter your title"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="mb-9">
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Content</label
          >
          <textarea
            type="text"
            v-model="form.body"
            placeholder="Enter your content"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <hr />
        <div class="text-center pt-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 mb-5 rounded-lg transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../../axios";

export default {
  data() {
    return {
      form: {
        title: "",
        body: "",
        user_id: this.$route.params.userId,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await api.post("/posts", this.form);
        console.log("Success create post: ", response.data);
        this.$router.back();
      } catch (error) {
        console.error("Error create post: ", error);
      }
    },
  },
};
</script>
