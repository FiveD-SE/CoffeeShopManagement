const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

require("dotenv").config();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
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
        username: String,
        password: String,
        role: String,
    });

    const User = mongoose.model("User", userSchema, "users");

    app.get("/users", async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error getting users", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    app.post("/users", async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const user = new User({ username, password, role });
            await user.save();
            res.status(201).json({ message: "User added successfully" });
        } catch (error) {
            console.error("Error adding user", error);
            res.status(500).json({ message: "Internal server error" });
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
