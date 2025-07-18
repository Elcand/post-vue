<template>
  <div class="bg-white rounded-2xl shadow-lg p-9 w-full mt-9 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      Post Detail
    </h1>
    <hr class="mb-4" />
    <table class="w-full mt-4 mb-6 text-lg">
      <tbody>
        <tr>
          <td class="pr-4 font-semibold w-32">Title</td>
          <td>:</td>
          <td class="pl-4">{{ post.title }}</td>
        </tr>

        <tr>
          <td class="pr-4 font-semibold w-32">Content</td>
          <td>:</td>
          <td class="pl-4">{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div class="flex justify-end">
      <button
        @click="goBack"
        class="mt-4 px-4 py-2 bg-blue-500 justify-end text-white rounded-lg hover:bg-blue-600"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },

  methods: {
    async getPost() {
      try {
        const postId = this.$route.params.id; // Ambil id dari route
        const response = await axios.get(`/posts/${postId}`); // Ambil post detail
        this.post = response.data;
        console.log("Success get post: ", this.post);
      } catch (error) {
        console.error("Error get post: ", error);
      }
    },
    goBack() {
      this.$router.back();
    },
  },

  mounted() {
    this.getPost();
  },
};
</script>
