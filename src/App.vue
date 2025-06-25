<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Create User
      </h1>
      <form class="space-y-5">
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Username</label
          >
          <input
            type="text"
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
              type="street"
              placeholder="Enter your street"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Suite</label
            >
            <input
              type="suite"
              placeholder="Enter your suite"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Street</label
            >
            <input
              type="street"
              placeholder="Enter your street"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2"
              >Suite</label
            >
            <input
              type="suite"
              placeholder="Enter your suite"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <hr />

        <div class="text-center pt-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
