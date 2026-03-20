// controllers/leaveController.js
const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;

  if (new Date(endDate) < new Date(startDate)) {
    return res.status(400).json({ msg: "Invalid dates" });
  }

  const leave = await Leave.create({
    userId: req.user.id,
    leaveType,
    startDate,
    endDate,
    reason
  });

  res.json(leave);
};

exports.getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
};

exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find().populate("userId", "name email");
  res.json(leaves);
};

exports.updateLeave = async (req, res) => {
  const { status } = req.body;

  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(leave);
};



