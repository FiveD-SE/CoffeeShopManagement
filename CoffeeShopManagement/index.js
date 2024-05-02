const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

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
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "user" },
        gender: { type: String },
        dateOfBirth: { type: Date },
        email: { type: String },
    });

    const User = mongoose.model("User", userSchema);

    app.get("/users/:phoneNumber", async (req, res) => {
        try {
            const { phoneNumber } = req.params;
            const user = await User.findOne({ phoneNumber });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error getting user", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    app.patch("/users/:phoneNumber", async (req, res) => {
        try {
            const { phoneNumber } = req.params;
            const { firstName, lastName, gender, dateOfBirth, email } =
                req.body;

            const user = await User.findOne({ phoneNumber });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (firstName) {
                user.firstName = firstName;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (gender) {
                user.gender = gender;
            }
            if (dateOfBirth) {
                user.dateOfBirth = dateOfBirth;
            }
            if (email) {
                user.email = email;
            }

            await user.save();

            res.status(200).json({
                message: "User updated successfully",
                user,
            });
        } catch (error) {
            console.error("Error updating user", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Change password
    app.patch("/users/:phoneNumber", async (req, res) => {
        try {
            const { phoneNumber } = req.params;
            const { newPassword } = req.body;

            const user = await User.findOne({ phoneNumber });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.error("Error updating user", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    app.post("/login", async (req, res) => {
        try {
            const { phoneNumber, password } = req.body;
            const user = await User.findOne({ phoneNumber });
            if (user) {
                const validPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (validPassword) {
                    res.status(200).json({ user });
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

            const fullNameArray = fullName.split(" ");
            const firstName = fullNameArray[fullNameArray.length - 1];
            const lastName = fullNameArray.slice(0, -1).join(" ");

            const existingUser = await User.findOne({ phoneNumber });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                firstName,
                lastName,
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

    // products
    const productSchema = new mongoose.Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
    });

    const Product = mongoose.model("Product", productSchema);

    app.post("/products", async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const newProduct = new Product({ name, price, description });
            await newProduct.save();
            res.status(201).json({ message: "Product created successfully" });
        } catch (error) {
            console.error("Error creating product", error);
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
