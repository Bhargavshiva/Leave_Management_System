
<script setup>
import { ref, onMounted } from "vue";
import API from "../api/api";

const leaves = ref([]);

const form = ref({
  leaveType: "",
  startDate: "",
  endDate: "",
  reason: ""
});

const fetchLeaves = async () => {
  const res = await API.get("/leaves/my");
  leaves.value = res.data;
};

const applyLeave = async () => {
  if (!form.value.leaveType || !form.value.startDate || !form.value.endDate) {
    alert("Please fill all fields");
    return;
  }

  await API.post("/leaves/apply", form.value);

  form.value = {
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  };

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
      <h2 class="text-2xl font-bold text-gray-800">Employee Dashboard</h2>
      <button @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
        Logout
      </button>
    </div>

    <!-- Apply Leave Card -->
    <div class="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Apply for Leave</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <select v-model="form.leaveType"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400">
          <option value="">Select Leave Type</option>
          <option value="Sick">Sick Leave</option>
          <option value="Casual">Casual Leave</option>
        </select>

        <input type="date" v-model="form.startDate"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" />

        <input type="date" v-model="form.endDate"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" />

        <input v-model="form.reason" placeholder="Reason"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" />

      </div>

      <button @click="applyLeave"
        class="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow">
        Apply Leave
      </button>
    </div>

    <!-- Leave List -->
    <div>
      <h3 class="text-lg font-semibold mb-3 text-gray-700">My Leave Requests</h3>

      <div v-if="leaves.length === 0" class="text-gray-500">
        No leave requests yet.
      </div>

      <div v-for="leave in leaves" :key="leave._id"
        class="bg-white p-4 rounded-xl shadow mb-3 flex justify-between items-center">

        <div>
          <p class="font-semibold text-gray-800">{{ leave.leaveType }}</p>
          <p class="text-sm text-gray-500">
            {{ leave.startDate }} → {{ leave.endDate }}
          </p>
          <p class="text-sm text-gray-400">{{ leave.reason }}</p>
        </div>

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

      </div>
    </div>

  </div>
</template>