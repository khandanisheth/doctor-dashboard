const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/testDB')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Mongo Error:", err));

const dataRoutes = require("./routes/dataRoutes");// routes is comming

app.use("/api", dataRoutes);
app.use("/upload", express.static("upload"));

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});