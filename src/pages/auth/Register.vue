<template>
  <div class="flex justify-center mt-7">
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg py-4 mt-5 mb-9">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Register
      </h1>
      <hr />
      <form class="space-y-4 my-6" @submit.prevent="submitForm">
        <div class="m-2 px-3 space-y-3">
          <div v-if="previewImage" class="text-center">
            <img
              :src="previewImage"
              alt="Preview"
              class="inline-block size-28 rounded-full ring-2 ring-blue-400 mb-4"
            />
          </div>

          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Profile Image</label
            >
            <input
              type="file"
              @change="handleFileChange"
              class="w-full h-[45px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <div class="grid grid-cols-2 gap-4">
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

            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2"
                >Password</label
              >
              <input
                type="password"
                v-model="form.password"
                placeholder="Enter your password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
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
                placeholder="Enter street"
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
                placeholder="Enter suite"
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
                placeholder="Enter city"
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
                placeholder="Enter zipcode"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <hr />

          <div class="text-center pt-6">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 mb-5 rounded-lg transition-all duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../axios";

const router = useRouter();
const errors = ref([]);
const previewImage = ref(null);

const form = reactive({
  username: "",
  name: "",
  email: "",
  password: "",
  img_profile: null,
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
});

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.img_profile = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const validateForm = () => {
  errors.value = [];

  if (!form.username) errors.value.push("Username is required.");
  if (!form.name) errors.value.push("Nama is required.");
  if (!form.email) errors.value.push("Email is required.");
  if (!form.password) errors.value.push("Password is required.");
  if (!form.address.street) errors.value.push("Street is required.");
  if (!form.address.city) errors.value.push("City is required.");
  if (!form.address.zipcode) errors.value.push("Zipcode is required.");

  return errors.value.length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);

    if (form.img_profile) {
      formData.append("img_profile", form.img_profile);
    }

    formData.append("address[street]", form.address.street);
    formData.append("address[suite]", form.address.suite);
    formData.append("address[city]", form.address.city);
    formData.append("address[zipcode]", form.address.zipcode);

    const response = await api.post("/users", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await login(form.email, form.password);

    alert("User berhasil dibuat!");
    router.push("/");
    console.log("Response dari API:", response.data);

    // Reset form
    Object.assign(form, {
      username: "",
      name: "",
      email: "",
      password: "",
      img_profile: null,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
    });
    previewImage.value = null;
    errors.value = [];
  } catch (error) {
    if (error.response?.data?.errors) {
      // Kalau backend kirim pesan error validasi Laravel
      errors.value = Object.values(error.response.data.errors).flat();
      console.log("Register gagal:", error.response.data.errors);
    } else {
      errors.value = ["Terjadi kesalahan server. Silakan coba lagi."];
    }
  }
};
</script>
