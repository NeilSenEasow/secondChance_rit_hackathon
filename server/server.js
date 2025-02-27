const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173", "https://second-chance-ff8xmyxfu-neilseneasows-projects.vercel.app"] // Added the new origin
}

app.use(cors(corsOptions));
app.use(express.json());

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

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

        // Simulate saving the user to a database
        const user = { name, email, password: hashedPassword };

        // Generate a token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

        return res.status(201).json({ message: "User registered successfully", user: { name, email }, token });
    } catch (error) {
        return res.status(500).json({ message: "Error registering user" });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Here you would typically add logic to validate the user against a database
    // For now, we'll simulate a successful login response
    if (email === "demo@example.com" && password === "password") {
        return res.status(200).json({ message: "Login successful", user: { email } });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
});

app.listen(5000, () => {
    console.log("Server started at port 5000");
});