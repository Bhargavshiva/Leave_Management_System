require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

//app.use(cors());

app.use(cors({
  origin: ["https://leave-management-system-1-cxg7.onrender.com"], // frontend URL
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leaves", require("./routes/leaveRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use("/",(req,res)=>{
    res.send("<h1>welcome to leave management system</h1>");
})