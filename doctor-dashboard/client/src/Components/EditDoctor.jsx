import React, { useEffect, useState } from "react";
import DoctorServices from "../Services/DoctorServices";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDoctor() {
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
    availability: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const dataFetch = async () => {
    const res = await DoctorServices.getDoctorById(id);
    try {
      if (res.data.success) {
        const data = res.data.data;
        setDoctorData(data);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load post data.");
    }
  };
  useEffect(() => {
    dataFetch();
  }, []);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in doctorData) {
      formData.append(key, doctorData[key]);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await DoctorServices.updateDoctor(id, formData);
      if (res.data.success) {
        setMsg("✅ Doctor updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMsg("❌ Update failed.");
      }
    } catch (error) {
      console.error(error);
      setMsg("❌ Error: " + (error.response?.data?.msg || error.message));
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
            value={doctorData.name}
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
            value={doctorData.specialization}
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
            value={doctorData.experience}
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
            value={doctorData.fees}
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
            value={doctorData.availability}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Doctor Image</label>
          <input type="file" className="form-control" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
