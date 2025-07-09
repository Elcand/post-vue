<template>
  <div class="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl items-start justify-start"
    >
      <div class="bg-white rounded-2xl shadow-lg p-9 w-full">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Detail User
        </h1>
        <hr class="mb-4" />
        <table class="w-full mt-4 text-lg">
          <tr>
            <td colspan="3" class="text-center py-4">
              <img
                :src="getUserImage(user.img_profile)"
                alt="Preview"
                class="rounded-full aspect-square max-w-[120px] w-full object-cover ring-2 ring-white mx-auto"
              />
            </td>
          </tr>
          <tr>
            <td class="pr-4 font-semibold">Username</td>
            <td>:</td>
            <td class="pl-4">{{ user.username }}</td>
          </tr>
          <tr>
            <td class="pr-4 font-semibold">Name</td>
            <td>:</td>
            <td class="pl-4">{{ user.name }}</td>
          </tr>
          <tr>
            <td class="pr-4 font-semibold">Email</td>
            <td>:</td>
            <td class="pl-4">{{ user.email }}</td>
          </tr>
        </table>

        <h1 class="font-bold mt-8 mb-2 text-xl">Address</h1>
        <hr class="mb-4" />
        <table class="w-full mt-2 text-lg mb-4">
          <tr>
            <td class="pr-4 font-semibold">Street</td>
            <td>:</td>
            <td class="pl-4">{{ user.address.street }}</td>
          </tr>
          <tr>
            <td class="pr-4 font-semibold">Suite</td>
            <td>:</td>
            <td class="pl-4">{{ user.address.suite }}</td>
          </tr>
          <tr>
            <td class="pr-4 font-semibold">City</td>
            <td>:</td>
            <td class="pl-4">{{ user.address.city }}</td>
          </tr>
          <tr>
            <td class="pr-4 font-semibold">Zip Code</td>
            <td>:</td>
            <td class="pl-4">{{ user.address.zipcode }}</td>
          </tr>
        </table>
        <hr />
        <div class="flex justify-end gap-4">
          <button
            @click="goBack"
            class="mt-4 px-4 py-2 bg-gray-400 justify-end text-white rounded-lg hover:bg-gray-500"
          >
            Back
          </button>
          <router-link
            :to="`/users/edit/${user.id}`"
            class="mt-4 px-4 py-2 bg-blue-500 justify-end text-white rounded-lg hover:bg-blue-600"
          >
            Update
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-9 w-full">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">User Posts</h1>
          <router-link
            :to="`/posts/create/${user.id}`"
            class="flex items-center gap-1 bg-blue-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-blue-600 transition"
          >
            Add Post
          </router-link>
        </div>
        <hr class="mb-4" />
        <table class="w-full mt-4 text-center text-lg">
          <thead class="bg-gray-100 font-semibold">
            <tr>
              <th class="border p-2">No</th>
              <th class="border p-2">Title</th>
              <th class="border p-2">Content</th>
              <th class="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in paginatedPosts" :key="post.id">
              <td class="border p-2">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="border p-2 text-left">{{ post.title }}</td>
              <td class="border p-2 text-left">
                {{ truncate(post.body, 50) }}
              </td>
              <td
                class="border p-2 flex flex-col lg:flex-row gap-2 justify-center items-center"
              >
                <router-link
                  :to="`/posts/show/${post.id}`"
                  class="flex items-center gap-1 bg-green-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-green-700 transition"
                >
                  <Eye class="w-4 h-4" />
                </router-link>

                <router-link
                  :to="`/posts/edit/${post.id}`"
                  class="flex items-center gap-1 bg-yellow-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-yellow-700 transition"
                >
                  <Pencil class="w-4 h-4" />
                </router-link>

                <button
                  @click="confirmDelete(post.id)"
                  class="flex items-center gap-1 bg-red-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-red-700 transition"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end mt-6 space-x-1">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 rounded-sm hover:bg-gray-400 disabled:opacity-50"
          >
            &larr;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 rounded-sm',
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-400',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-200 rounded-sm hover:bg-gray-400 disabled:opacity-50"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
import { Eye, Pencil, Trash2 } from "lucide-vue-next";

export default {
  components: {
    Eye,
    Pencil,
    Trash2,
  },

  data() {
    // nge return data untuk ditampilkan
    return {
      user: {
        username: "",
        name: "",
        email: "",
        img_profile: null,
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
      },
      posts: [],
      perPage: 4,
      currentPage: 1,
      previewImage: null,
    };
  },

  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.posts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.perPage);
    },
  },

  methods: {
    // get user dari api
    async getUser() {
      try {
        const userId = this.$route.params.id; // ambil id dari route
        const response = await axios.get(`/users/${userId}`);
        this.user = response.data;
        console.log("Success get user: ", this.user);
      } catch (error) {
        console.error("Error get user: ", error);
      }
    },

    // get post dari api
    async getPosts() {
      try {
        const userId = this.$route.params.id; // ambil id dari route
        const response = await axios.get(`/users/${userId}/posts`);
        this.posts = response.data;
        console.log("Success get posts: ", this.posts);
      } catch (error) {
        console.error("Error get posts: ", error);
      }
    },

    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
    async deletePost(postId) {
      try {
        await axios.delete(`/posts/${postId}`);
        this.posts = this.posts.filter((post) => post.id !== postId);
        console.log(`Post ${postId} berhasil dihapus`);
      } catch (error) {
        console.error("Error delete post:", error);
      }
    },

    confirmDelete(postId) {
      if (confirm("Yakin mau hapus post ini?")) {
        this.deletePost(postId);
      }
    },

    goBack() {
      this.$router.back();
    },

    getUserImage(imgPath) {
      return imgPath
        ? `http://localhost:8000/storage/${imgPath}`
        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
    },
  },
  mounted() {
    this.getUser();
    this.getPosts();
  },
};
</script>
