const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');

// Configure CORS with more explicit options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://second-chance-ff8xmyxfu-neilseneasows-projects.vercel.app", 
    "https://second-chance-rust.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

const app = express();

// Apply CORS middleware before other middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

// Connect to MongoDB
const mongoURI = "mongodb+srv://neilseneasow:neilseneasow123@cluster0.fvwdl.mongodb.net/secondChance?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => {
      console.log("Connected to MongoDB");
  })
  .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
  });

// Define a User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Create a User model
const User = mongoose.model("User", userSchema);

// Define a Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }, // URL of the image
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who added the product
}, { timestamps: true });

// Create a Product model
const Product = mongoose.model("Product", productSchema);

// Configure multer for file uploads (if needed)
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the header
  if (!token) return res.status(401).json({ message: 'Access token required' });

  console.log("Token:", token);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Attach user info to the request
    next();
  });
};

app.get("/", (req, res) => {
  res.json({ fruits: ["apple", "banana", "orange"] });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Generate a token
    const token = jwt.sign({ id: user._id, email }, SECRET_KEY, { expiresIn: "1h" });

    return res.status(201).json({
      message: "User registered successfully",
      user: { name, email },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token with user ID
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Use req.user.id to find the user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

app.post("/add-product", authenticateToken, upload.single('image'), async (req, res) => {
  console.log(req.body); // Log the incoming request body
  const { name, description, price, category, location } = req.body;
  const image = req.file ? req.file.path : req.body.image; // Get the image URL from the request

  // Check for missing fields and return specific messages
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!description) missingFields.push("description");
  if (!price) missingFields.push("price");
  if (!category) missingFields.push("category");
  if (!location) missingFields.push("location");
  if (!image) missingFields.push("image");

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
  }

  try {
    // Get the user ID from the users collection
    const user = await User.findById(req.user.id); // Use req.user.id to find the user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      category,
      location,
      image,
      user: user._id
    });

    // Save the product to the database
    await product.save();

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding product" });
  }
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
