<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-xl bg-white rounded-lg shadow-lg px-9 mt-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Update Post
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

        <div>
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
import axios from "../../axios";

export default {
  data() {
    return {
      postId: this.$route.params.id,
      form: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    async getPost() {
      try {
        const response = await axios.get(`/posts/${this.postId}`);
        const post = response.data;

        this.form.title = post.title;
        this.form.body = post.body;

        console.log("Success get post: ", this.form);
      } catch {
        console.error("Error get post: ", error);
        alert("Gagal mengambil data post.");
      }
    },

    async submitForm() {
      try {
        const response = await axios.put(`/posts/${this.postId}`, this.form);
        alert("Success Update Post!");
        this.$router.back();
        console.log("Response dari API:", response.data);
      } catch (error) {
        console.error("Error updating post:", error);
        alert("Gagal mengupdate post.");
      }
    },
  },

  mounted() {
    this.getPost();
  },
};
</script>
