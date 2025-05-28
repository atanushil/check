const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

// app.use(cors({
//   origin: "http://localhost:5173", // your frontend origin
//   credentials: true
// }));
app.use(cors({
  origin: "*",            // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
