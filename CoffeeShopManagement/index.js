const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
    startServer();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    process.exit(1);
  });

const startServer = () => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  });

  const User = mongoose.model("User", userSchema);

  app.get("/users/:phoneNumber", async (req, res) => {
    try {
      const { phoneNumber } = req.params;
      const user = await User.findOne({ phoneNumber });
      if (user) {
        res.status(200).json(user.role);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      const user = await User.findOne({ phoneNumber });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          // Generate token
          const token = jwt.sign(
            { phoneNumber: user.phoneNumber, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error logging in", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/signup", async (req, res) => {
    try {
      const { fullName, phoneNumber, password, role } = req.body;
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullName,
        phoneNumber,
        password: hashedPassword,
        role: role || "user",
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error signing up", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/role", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { role } = decodedToken;
      res.status(200).json({ role });
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
