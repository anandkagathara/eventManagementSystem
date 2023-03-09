const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const eventRoutes = require("./src/routes/event.routes");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/event-management-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/events", eventRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

exports.module = app;
