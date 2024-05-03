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
			const { firstName, lastName, gender, dateOfBirth, email } = req.body;

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
				const validPassword = await bcrypt.compare(password, user.password);
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

	// favorites
	const favoriteSchema = new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
	});

	const Favorite = mongoose.model("Favorite", favoriteSchema);

	app.get("/favorites/:userId", async (req, res) => {
		try {
			const { userId } = req.params;

			if (!mongoose.Types.ObjectId.isValid(userId)) {
				return res.status(400).json({ message: "Invalid userId" });
			}

			const favorites = await Favorite.findOne({ userId }).populate("products");
			if (favorites !== null) {
				res.status(200).json({ favorites });
			} else {
				res.status(200).json({ favorites: null });
			}
		} catch (error) {
			console.error("Error getting favorites", error);
			res.status(500).json({ message: "Internal server error" });
		}
	});

	app.post("/favorites", async (req, res) => {
		try {
			const { userId, products } = req.body;

			if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
				return res.status(400).json({ message: "Invalid userId" });
			}

			if (!Array.isArray(products)) {
				return res.status(400).json({
					message: "Invalid request. Please provide an array of products.",
				});
			}

			const productIds = products.map(
				(productId) => new mongoose.Types.ObjectId(productId)
			);

			const newFavorites = new Favorite({
				userId: userId,
				products: productIds,
			});

			await newFavorites.save();

			res.status(201).json({
				message: "Favorites added successfully",
				favorites: newFavorites,
			});
		} catch (error) {
			console.error("Error adding favorites", error);
			res.status(500).json({ message: "Internal server error" });
		}
	});

	// oders

	const orderSchema = new mongoose.Schema({
		time: { type: String, required: true },
		orderType: { type: String, required: true },
		customer: { type: String },
		sdt: { type: String },
		orderState: { type: String, required: true },
		state: { type: String, required: true },
		products: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				amount: { type: Number, required: true },
			},
		],
	});

	const Order = mongoose.model("Order", orderSchema);

	app.get("/orders", async (req, res) => {
		try {
			const orders = await Order.find();
			if (orders) {
				res.status(200).json({ orders });
			} else {
				res.status(404).json({ message: "Orders not found" });
			}
		} catch (error) {
			console.error("Error");
			res.status(500).json({ message: "Internal server error" });
		}
	});

	app.post("/orders", async (req, res) => {
		try {
			const { time, orderType, customer, sdt, orderState, state, products } =
				req.body;

			const productsExist = await Promise.all(
				products.map(async (product) => {
					const productExist = await Product.findById(product._id);
					return productExist;
				})
			);

			if (productsExist.some((product) => !product)) {
				return res
					.status(404)
					.json({ message: "One or more products not found" });
			}

			const newOrder = new Order({
				time,
				orderType,
				customer,
				sdt,
				orderState,
				state,
				products,
			});
			await newOrder.save();
			res.status(201).json({ message: "Order created successfully", newOrder });
		} catch (error) {
			console.error("Error creating order", error);
			res.status(500).json({ message: "Internal server error" });
		}
	});

	// branches
	const branchSchema = new mongoose.Schema({
		name: { type: String, required: true },
		contact: { type: String, required: true },
		email: { type: String, required: true },
		location: { type: String, required: true },
		openingHour: { type: String, required: true },
		closingHour: { type: String, required: true },
	});

	const Branch = mongoose.model("branches", branchSchema);

	app.post("/branches", async (req, res) => {
		try {
			const { name, contact, email, location, openingHour, closingHour } =
				req.body;
			const newBranch = new Branch({
				name,
				contact,
				email,
				location,
				openingHour,
				closingHour,
			});
			await newBranch.save();
			res.status(201).json({ message: "Branch created successfully" });
		} catch (error) {
			console.error("Error creating branch", error);
			res.status(500).json({ message: "Internal server error" });
		}
	});

	app.get("/branches", async (req, res) => {
		try {
			const branches = await Branch.find();
			if (branches.length > 0) {
				res.status(200).json({ branches });
			} else {
				res.status(404).json({ message: "Branches not found" });
			}
		} catch (error) {
			console.error("Error retrieving branches", error);
			res.status(500).json({ message: "Internal server error" });
		}
	});

	//Voucher

	const voucherSchema = new mongoose.Schema({
		name: { type: String, required: true },
		description: { type: String, required: true },
		dateStart: { type: Date, required: true },
		dateEnd: { type: Date, required: true },
		type: { type: String, required: true },
		point: { type: String, required: true },
		object: { type: String, required: true},
	})

	const Voucher = mongoose.model("vouchers", voucherSchema);

	app.post("/vouchers", async (req, res) => {
		try {
			const { name, description, dateStart, dateEnd, type, point, object } = req.body;
			const newVoucher = new Voucher({ name, description, dateStart, dateEnd, type, point, object });
			await newVoucher.save();
			res.status(201).json({ message: "Voucher created successfully" });
		} catch (error) {
			console.error("Error creating voucher", error);
			res.status(500).json({ message: "Internal server error" })
		}
	});

	app.get("/vouchers", async (req, res) => {
		try {
			const voucher = await Voucher.find();
			if (voucher.length > 0) {
				res.status(200).json({ voucher });
			} else {
				res.status(404).json({ message: "Voucher not found" });
			}
		} catch (error) {
			console.error("Error retrieving voucher", error);
			res.status(500).json({ message: "Internal server error" });
		}
	});

	//

	app.use((err, req, res, next) => {
		console.error(err.stack);
		res.status(500).json({ message: "Something broke!" });
	});

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
};