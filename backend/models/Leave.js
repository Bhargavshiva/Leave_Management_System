// models/Leave.js
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);