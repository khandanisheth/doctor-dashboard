import React, { useState } from "react";
import DoctorServices from "../Services/DoctorServices";
import { useNavigate } from "react-router-dom";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
    availability: "",
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append("image", image);

    try {
      const res = await DoctorServices.dataCreate(data); // ✅ correct here
      if (res.data.success) {
        setMsg("✅ Doctor added successfully!");
        setImage(null);
        setFormData({
          name: "",
          specialization: "",
          experience: "",
          fees: "",
          availability: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMsg("❌ Error: " + res.data.message);
      }
    } catch (err) {
      setMsg("❌ Failed to send data.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "600px" }}>
      <h4 className="mb-4 text-center">Add Doctor Profile</h4>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Doctor Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Specialization</label>
          <input
            type="text"
            className="form-control"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience</label>
          <input
            type="text"
            className="form-control"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fees</label>
          <input
            type="number"
            className="form-control"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Availability</label>
          <input
            type="text"
            className="form-control"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor Image</label>
          <input type="file" className="form-control" name="image" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
