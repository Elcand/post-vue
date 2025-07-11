<template>
  <div class="text-end m-5">
    <div class="m-4 p-2 space-x-5 pr-5">
      <router-link :to="`/login`">Log in</router-link>
      <router-link :to="`/register`">Register</router-link>
    </div>
  </div>
  <div class="flex justify-center mt-12 mb-4">
    <div class="w-auto bg-white rounded-lg shadow-lg p-9">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Table User</h1>
        <router-link
          :to="`/users/create`"
          class="flex items-center gap-1 bg-blue-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-blue-600 transition"
        >
          Add User
        </router-link>
      </div>
      <table class="w-full text-left border-collapse border-gray-300">
        <thead class="bg-gray-100 text-center">
          <tr>
            <th class="border p-2" rowspan="2">Username</th>
            <th class="border p-2" rowspan="2">Name</th>
            <th class="border p-2" rowspan="2">Email</th>
            <th class="border p-2 text-center" colspan="4">Address</th>
            <th class="border p-2" rowspan="2">Action</th>
          </tr>
          <tr>
            <th class="border p-2">Street</th>
            <th class="border p-2">Suite</th>
            <th class="border p-2">City</th>
            <th class="border p-2">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border p-2">{{ user.username }}</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.address.street }}</td>
            <td class="border p-2">{{ user.address.suite }}</td>
            <td class="border p-2">{{ user.address.city }}</td>
            <td class="border p-2">{{ user.address.zipcode }}</td>
            <td
              class="border p-2 flex flex-col lg:flex-row gap-2 justify-center items-center"
            >
              <router-link
                :to="`/posts/index/${user.id}`"
                class="flex items-center gap-1 bg-green-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-green-700 transition"
              >
                <Eye class="w-4 h-4" />
              </router-link>

              <router-link
                :to="`/users/edit/${user.id}`"
                class="flex items-center gap-1 bg-yellow-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-yellow-700 transition"
              >
                <Pencil class="w-4 h-4" />
              </router-link>

              <button
                @click="confirmDelete(user.id)"
                class="flex items-center gap-1 bg-red-500 p-2 rounded-lg text-white text-sm font-bold hover:bg-red-700 transition"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "../../axios";
import { Eye, Pencil, Trash2 } from "lucide-vue-next";

export default {
  components: {
    Eye,
    Pencil,
    Trash2,
  },
  // form saat belum submit
  data() {
    return {
      form: {
        username: "",
        name: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
      },
      users: [], // kalo udah input, maka data disimpin disini.
    };
  },
  methods: {
    // get users dummy dari api
    async getUsers() {
      try {
        const response = await api.get("/users");
        this.users = response.data;
        console.log("Success get users: ", this.users);
      } catch (error) {
        console.error("Error get users: ", error);
      }
    },
    async deleteUser(userId) {
      try {
        await api.delete(`/users/${userId}`);
        this.users = this.users.filter((user) => user.id !== userId);
        console.log(`User ${userId} berhasil dihapus`);
      } catch (error) {
        console.error("Error delete users:", error);
      }
    },

    confirmDelete(userId) {
      if (confirm("Yakin mau hapus users ini?")) {
        this.deleteUser(userId);
      }
    },
  },

  mounted() {
    this.getUsers();
  },

  // kalo udah di submit, maka data disimpan akan ditampilkan pada tabel
  form() {
    return {
      users: {
        username: this.form.username,
        name: this.form.name,
        email: this.form.email,
        address: {
          street: this.form.address.street,
          suite: this.form.address.suite,
          city: this.form.address.city,
          zipcode: this.form.address.zipcode,
        },
      },
    };
  },
};
</script>
