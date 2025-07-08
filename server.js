const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const http = require("http");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);
app.use("/imageUpload", express.static(path.join(__dirname, "imageUpload")));
app.use("/api/hotels", hotelRoutes);

connectDB().then(() => {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port $(process.env.PORT)`);
  });
});
