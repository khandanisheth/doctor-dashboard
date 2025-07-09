import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DoctorServices from "../Services/DoctorServices";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await DoctorServices.getDoctorById(id);
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        setError("Doctor not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctor.");
    }
  };

  const deleteDoctor = async () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await DoctorServices.deleteDoctor(id);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error deleting doctor");
      }
    }
  };

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (!doctor) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-4">👨‍⚕️ Doctor Profile</h4>

        <img
          src={`http://localhost:3001/upload/${doctor.image}`}
          alt={doctor.name}
          className=" mx-auto d-block mb-3 rounded-circle"
          height="100"
          width="100"
        />

        <p>
          <strong>Name:</strong> {doctor.name}
        </p>
        <p>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>
        <p>
          <strong>Experience:</strong> {doctor.experience}
        </p>
        <p>
          <strong>Fees:</strong> ₹{doctor.fees}
        </p>
        <p>
          <strong>Availability:</strong> {doctor.availability}
        </p>

        <div className="d-flex justify-content-between mt-4">
          <Link to={`/edit/${doctor._id}`} className="btn btn-primary w-45">
            <i className="fa-solid fa-pen-to-square me-1"></i>Edit
          </Link>

          <button className="btn btn-danger w-45" onClick={deleteDoctor}>
            <i className="fa-solid fa-trash me-1"></i>Delete
          </button>
        </div>

        <Link to="/" className="btn btn-secondary mt-3 w-100">
          <i className="fa-solid fa-arrow-left me-2"></i>Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DoctorProfile;
