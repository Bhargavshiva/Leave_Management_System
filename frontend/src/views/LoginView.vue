
<script setup>
import { ref } from "vue";
import API from "../api/api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMsg = ref(""); 
const router = useRouter();

const login = async () => {
  // Frontend validation
  if (!email.value || !password.value) {
    errorMsg.value = "Please enter both email and password.";
    return;
  }

  try {
    const res = await API.post("/auth/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    // Redirect based on role
    if (res.data.role === "employee") router.push("/employee");
    else router.push("/employer");

  } catch (err) {
    // Handle API errors
    if (err.response && err.response.status === 401) {
      errorMsg.value = "Incorrect email or password.";
    } else {
      errorMsg.value = "Something went wrong. Please try again.";
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
    <div class="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back 👋
      </h2>

      <!-- Error Message -->
      <p v-if="errorMsg" class="text-red-500 text-sm mb-3 text-center">
        {{ errorMsg }}
      </p>

      <!-- Email -->
      <input 
        v-model="email" 
        placeholder="Email Address"
        class="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />

      <!-- Password -->
      <input 
        v-model="password" 
        type="password" 
        placeholder="Password"
        class="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />

      <!-- Button -->
      <button 
        @click="login"
        class="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition duration-300 shadow-md"
      >
        Login
      </button>

      <!-- Footer -->
      <p class="text-sm text-center mt-4 text-gray-600">
        Don’t have an account?
        <a href="/signup" class="text-indigo-500 font-medium hover:underline">
          Signup
        </a>
      </p>
    </div>
  </div>
</template>