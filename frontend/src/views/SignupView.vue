
<script setup>
import { ref } from "vue";
import API from "../api/api";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("employee");
const errorMsg = ref(""); // To display errors

const router = useRouter();

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signup = async () => {
  // Frontend validation
  if (!name.value || !email.value || !password.value) {
    errorMsg.value = "Please fill in all fields.";
    return;
  }

  if (!emailRegex.test(email.value)) {
    errorMsg.value = "Please enter a valid email address.";
    return;
  }

  if (password.value.length < 6) {
    errorMsg.value = "Password must be at least 6 characters.";
    return;
  }

  try {
    await API.post("/auth/signup", {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    });

    alert("Signup successful");
    router.push("/");

  } catch (err) {
    if (err.response && err.response.status === 409) {
      // 409 Conflict – email already exists
      errorMsg.value = "Email already exists. Try logging in.";
    } else {
      errorMsg.value = "Something went wrong. Please try again.";
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <div class="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      <!-- Error Message -->
      <p v-if="errorMsg" class="text-red-500 text-sm mb-3 text-center">
        {{ errorMsg }}
      </p>

      <!-- Name -->
      <input 
        v-model="name" 
        placeholder="Full Name"
        class="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />

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
        class="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />

      <!-- Role -->
      <select 
        v-model="role" 
        class="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="employee">Employee</option>
        <option value="employer">Employer</option>
      </select>

      <!-- Button -->
      <button 
        @click="signup"
        class="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition duration-300 shadow-md"
      >
        Sign Up
      </button>

      <!-- Footer -->
      <p class="text-sm text-center mt-4 text-gray-600">
        Already have an account?
        <a href="/" class="text-indigo-500 font-medium hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
</template>