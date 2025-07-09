const mongoose = require("mongoose");

const DB = new mongoose.Schema({
    name: String,
    specialization: String,
    experience: String,
    fees: Number,
    availability: String,
    image: String, 
});

module.exports=mongoose.model("DoctorData",DB);



// {
//   "name": "Dr. Aisha Khan",
//   "specialization": "Cardiologist",
//   "experience": "10 years",
//   "fees": 500,
//   "availability": "Mon - Fri, 10 AM - 4 PM",
//   "image": "https://cdn.cloudinary.com/.../doctor.jpg"
// }


// const mongoose = require("mongoose");

// const doctorSchema = new mongoose.Schema({
//     name: String,
//     specialization: String,
//     experience: String,
//     fees: Number,
//     availability: String,
//     image: String, // Store image URL or filename
// });