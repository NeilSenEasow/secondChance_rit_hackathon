const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173" // Removed the trailing slash
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({ fruits: ["apple", "banana", "orange"] });
});

app.listen(5000, () => {
    console.log("Server started at port 5000");
});