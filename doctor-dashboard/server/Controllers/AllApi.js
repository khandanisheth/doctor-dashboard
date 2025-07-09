const DB = require("../models/dataModel");


const createData = async (req, res) => {
    try {
        const { name, specialization, experience, fees, availability } = req.body;
        const image = req.file.filename;
        const dataSave = new DB({
            name, specialization, experience, fees, availability, image
        });
        await dataSave.save();
        res.status(201).json({ success: true, message: "Doctor Added Successfully Insert", data: dataSave });
    } catch (error) {
        console.error("Create Doctor Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error });
    }
}

const dataGet = async (req, res) => {
    try {
        const getData = await DB.find({});

        res.status(200).send({ success: true, msg: "All Data Get SuccessFully ", data: getData }); // ✅ 200 instead of 400
    } catch (error) {
        res.status(200).send({ success: false, msg: "All Data Get UnSuccessFully" }); // ✅ 200 instead of 400
    }
}
const DoctorGet = async (req, res) => {
    try {
        const doctor = await DB.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, msg: "Doctor not found" });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error getting doctor" });
    }
}


const deleteDoctorData = async (req, res) => {
    try {
        const id = req.params.id;
        await DB.findByIdAndDelete({ _id: id });
        res.status(200).send({ success: true, msg: "Data Delete Successfully", });
    } catch (error) {
        res.status(501).json({ success: false, msg: "Data Delete UnSuccessfully" });
    }
}
const DoctorDataUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, specialization, experience, fees, availability } = req.body;
        const updatedData = { name, specialization, experience, fees, availability };
        if (req.file) {
            updatedData.image = req.file.filename;
        }
        const updatedDoctor = await DB.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).send({
            success: true, msg: "Data Update Successfully", data: updatedDoctor,
        });
    } catch (error) {
        res.status(500).send({
            success: false, msg: "Server error while updating doctor",
        });
    }
};


module.exports = { createData, dataGet, DoctorGet, deleteDoctorData, DoctorDataUpdate };



