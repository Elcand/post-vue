<template>
  <div class="flex justify-center mt-12 mb-4">
    <div class="w-auto bg-white rounded-lg shadow-lg p-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Table User
      </h1>
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
                <Edit class="w-4 h-4" />
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

  <div class="flex justify-center mt-12">
    <div class="w-full max-w-xl bg-white rounded-lg shadow-lg px-9 mt-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Create User
      </h1>
      <hr />
      <form class="space-y-2 mt-4" @submit.prevent="submitForm">
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Username</label
          >
          <input
            type="text"
            v-model="form.username"
            placeholder="Enter your username"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Name</label
          >
          <input
            type="text"
            v-model="form.name"
            placeholder="Enter your name"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <h1 class="pt-5 text-lg font-bold">Address</h1>
        <hr />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Street</label
            >
            <input
              type="text"
              v-model="form.address.street"
              placeholder="Enter your street"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Suite</label
            >
            <input
              type="text"
              v-model="form.address.suite"
              placeholder="Enter your suite"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >City</label
            >
            <input
              type="text"
              v-model="form.address.city"
              placeholder="Enter your city"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Zipcode</label
            >
            <input
              type="number"
              v-model="form.address.zipcode"
              placeholder="Enter your zipcode"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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
import { Edit, Pencil, Trash2 } from "lucide-vue-next";

export default {
  components: {
    Edit,
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
    // saat form submit
    async submitForm() {
      try {
        const response = await api.post("/users", this.form);
        alert("User berhasil dibuat!");
        console.log("Response dari API:", response.data);

        const newUser = { ...this.form, id: Date.now() };
        this.users.push(newUser);

        this.form = {
          username: "",
          name: "",
          email: "",
          address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
          },
        };
      } catch (error) {
        console.error(error);
        alert("Gagal membuat user.");
      }
    },

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
