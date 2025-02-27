const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

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
mongoose
  .connect(
    "mongodb+srv://neilseneasow:neilseneasow123@cluster0.fvwdl.mongodb.net/secondChance?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
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
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

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

    // Generate a token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
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
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
