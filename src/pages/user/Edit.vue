<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-xl bg-white rounded-lg shadow-lg px-9 mt-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Update User
      </h1>
      <hr />
      <form class="space-y-2 mt-4" @submit.prevent="submitForm">
        <div>
          <div v-if="previewImage" class="mb-2">
            <img
              :src="previewImage"
              alt="Preview"
              class="rounded-full aspect-square max-w-[120px] w-full object-cover ring-2 ring-white"
            />
          </div>

          <label class="block text-lg font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            @change="handleFileChange"
            class="w-full h-[40px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
              type="text"
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

export default {
  data() {
    return {
      userId: this.$route.params.id,
      form: {
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
      previewImage: null,
    };
  },

  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.form.img_profile = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },

    async getUser() {
      try {
        const response = await api.get(`/users/${this.userId}`);
        const user = response.data;

        // Assign data secara aman dan tetap reactive
        this.form.username = user.username;
        this.form.name = user.name;
        this.form.email = user.email;
        this.form.address.street = user.address.street;
        this.form.address.suite = user.address.suite;
        this.form.address.city = user.address.city;
        this.form.address.zipcode = user.address.zipcode;

        console.log("Success get user:", this.form);
      } catch (error) {
        console.error("Error getting user:", error);
        alert("Gagal mengambil data user.");
      }
    },

    async submitForm() {
      try {
        const formData = new FormData();
        formData.append("username", this.form.username);
        formData.append("name", this.form.name);
        formData.append("email", this.form.email);

        if (this.form.img_profile) {
          formData.append("img_profile", this.form.img_profile);
        }

        formData.append("address[street]", this.form.address.street);
        formData.append("address[suite]", this.form.address.suite);
        formData.append("address[city]", this.form.address.city);
        formData.append("address[zipcode]", this.form.address.zipcode);

        const response = await api.post(
          `/users/${this.userId}?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Success Update User!");
        this.$router.push("/");
        console.log("Response dari API:", response.data);
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Gagal mengupdate user.");
      }
    },
  },

  mounted() {
    this.getUser();
  },
};
</script>
