
<script setup>
import { ref, onMounted } from "vue";
import API from "../api/api";

const leaves = ref([]);

const fetchLeaves = async () => {
  const res = await API.get("/leaves/all");
  leaves.value = res.data;
};

const update = async (id, status) => {
  await API.put(`/leaves/${id}`, { status });
  fetchLeaves();
};

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

onMounted(fetchLeaves);
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Employer Dashboard</h2>
      <button @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
        Logout
      </button>
    </div>

    <!-- Leave Requests Card -->
    <div class="bg-white p-6 rounded-2xl shadow-md">

      <h3 class="text-lg font-semibold mb-4 text-gray-700">All Leave Requests</h3>

      <div v-if="leaves.length === 0" class="text-gray-500">
        No leave requests yet.
      </div>

      <div v-for="leave in leaves" :key="leave._id"
        class="bg-gray-50 p-4 rounded-xl shadow mb-3 flex justify-between items-center">

        <div>
          <p class="font-semibold text-gray-800">{{ leave.userId.name }}</p>
          <p class="text-sm text-gray-500">{{ leave.leaveType }} | {{ leave.startDate }} → {{ leave.endDate }}</p>
          <p class="text-sm text-gray-400">{{ leave.reason }}</p>
        </div>

        <!-- Status & Actions -->
        <div class="flex items-center space-x-2">

          <!-- Status Badge -->
          <span
            :class="{
              'bg-yellow-100 text-yellow-600': leave.status === 'Pending',
              'bg-green-100 text-green-600': leave.status === 'Approved',
              'bg-red-100 text-red-600': leave.status === 'Rejected'
            }"
            class="px-3 py-1 rounded-full text-sm font-semibold"
          >
            {{ leave.status }}
          </span>

          <!-- Action Buttons (Only if Pending) -->
          <div v-if="leave.status === 'Pending'" class="flex space-x-2">
            <button @click="update(leave._id, 'Approved')"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition">
              Approve
            </button>

            <button @click="update(leave._id, 'Rejected')"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
              Reject
            </button>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>