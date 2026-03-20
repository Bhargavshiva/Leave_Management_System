// // controllers/leaveController.js
// const Leave = require("../models/Leave");

// exports.applyLeave = async (req, res) => {
//   const { leaveType, startDate, endDate, reason } = req.body;

//   if (new Date(endDate) < new Date(startDate)) {
//     return res.status(400).json({ msg: "Invalid dates" });
//   }

//   const leave = await Leave.create({
//     userId: req.user.id,
//     leaveType,
//     startDate,
//     endDate,
//     reason
//   });

//   res.json(leave);
// };

// exports.getMyLeaves = async (req, res) => {
//   const leaves = await Leave.find({ userId: req.user.id });
//   res.json(leaves);
// };

// exports.getAllLeaves = async (req, res) => {
//   const leaves = await Leave.find().populate("userId", "name email");
//   res.json(leaves);
// };

// exports.updateLeave = async (req, res) => {
//   const { status } = req.body;

//   const leave = await Leave.findByIdAndUpdate(
//     req.params.id,
//     { status },
//     { new: true }
//   );

//   res.json(leave);
// };




// controllers/leaveController.js
const Leave = require("../models/Leave");

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Validate required fields
    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ msg: "Please fill all required fields." });
    }

    // Validate date order
    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ msg: "End date cannot be before start date." });
    }

    // Create leave entry
    const leave = await Leave.create({
      userId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason: reason || "No reason provided",
      status: "Pending"
    });

    res.status(201).json(leave);
  } catch (err) {
    console.error("Apply Leave Error:", err.message);
    res.status(500).json({ msg: "Server error while applying leave." });
  }
};

// Get leaves of logged-in user
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id }).sort({ startDate: -1 });
    res.json(leaves);
  } catch (err) {
    console.error("Get My Leaves Error:", err.message);
    res.status(500).json({ msg: "Server error while fetching your leaves." });
  }
};

// Get all leaves (Employer only)
exports.getAllLeaves = async (req, res) => {
  try {
    // Populate user details (name, email) safely
    const leaves = await Leave.find()
      .populate("userId", "name email")
      .sort({ startDate: -1 });

    res.json(leaves);
  } catch (err) {
    console.error("Get All Leaves Error:", err.message);
    res.status(500).json({ msg: "Server error while fetching all leaves." });
  }
};

// Update leave status (Employer only)
exports.updateLeave = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value." });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email");

    if (!leave) {
      return res.status(404).json({ msg: "Leave request not found." });
    }

    res.json(leave);
  } catch (err) {
    console.error("Update Leave Error:", err.message);
    res.status(500).json({ msg: "Server error while updating leave." });
  }
};
