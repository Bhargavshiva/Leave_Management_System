// routes/leaveRoutes.js
const router = require("express").Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeave
} = require("../controllers/leaveController");

const { auth, isEmployer } = require("../middleware/authMiddleware");

router.post("/apply", auth, applyLeave);
router.get("/my", auth, getMyLeaves);
router.get("/all", auth, isEmployer, getAllLeaves);
router.put("/:id", auth, isEmployer, updateLeave);

module.exports = router;