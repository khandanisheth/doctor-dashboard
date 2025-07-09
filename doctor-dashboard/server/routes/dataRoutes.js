// Express import kar rahe hain aur ek router banaya
const express = require("express");
const data_rotues = express.Router();
// File upload ke liye multer aur path module liya
const multer = require("multer");
const path = require("path");
// CORS import kiya taaki frontend backend ko access kar sake
const cors = require("cors");
// JSON body parse karne ke liye middleware
data_rotues.use(express.json());
data_rotues.use(cors());

const dataApi = require('../Controllers/AllApi');

// const storage = multer.diskStorage({
//     // Jab file upload ho, kahan store karein
//     destination: (req, file, cb) => {
//         // __dirname = current folder ka path
//         cb(null, path.join(__dirname, "./upload"));
//     },
//     // File ka naam kya rakhen
//     filename: (req, file, cb) => {
//         const dataimg = Date.now() + '-' + file.originalname;
//         cb(null, dataimg); // file ko final naam de diya
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../upload")); // ✅ upload folder root me hona chahiye
    },
    filename: (req, file, cb) => {
        const dataimg = Date.now() + '-' + file.originalname;
        cb(null, dataimg);
    }
});

// Multer ka instance banaya with disk storage config
const upload = multer({ storage: storage });

data_rotues.post("/adddoctor", upload.single("image"), dataApi.createData);
data_rotues.get("/alldoctor", dataApi.dataGet);
data_rotues.get("/getdoctor/:id", dataApi.DoctorGet);
data_rotues.delete("/deletedoctor/:id", dataApi.deleteDoctorData);
data_rotues.put("/updatedoctor/:id",upload.single("image") ,dataApi.DoctorDataUpdate);

module.exports = data_rotues;//deletedoctor
