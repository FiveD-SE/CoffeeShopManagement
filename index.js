const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose
    .connect(
        "mongodb+srv://slowey:tlvptlvp@coffeeshopmangement.tmboii0.mongodb.net/test",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
});

// hay chua kill terminal ben kia:)))

const User = mongoose.model("User", userSchema);

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

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
