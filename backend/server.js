const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Kumbh Backend Running 🚀");
});

// routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});