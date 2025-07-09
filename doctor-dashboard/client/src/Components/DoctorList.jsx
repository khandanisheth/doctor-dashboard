import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DoctorServices from "../Services/DoctorServices";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchDoctors = async () => {
    try {
      const res = await DoctorServices.dataGet();
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        setError("Failed to fetch posts.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await DoctorServices.deleteDoctor(id);
        navigate("/");
        fetchDoctors();
      } catch (error) {
        console.error(err);
        alert("Error deleting doctor");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Doctor List</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      {doctors.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark text-center">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Fees</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>
                  <img className="rounded-circle" src={`http://localhost:3001/upload/${doc.image}`} alt={doc.name} height="50" width="50" />
                </td>
                <td>{doc.name}</td>
                <td>{doc.specialization}</td>
                <td>{doc.experience}</td>
                <td>₹{doc.fees}</td>
                <td>{doc.availability}</td>
                <td>
                  <Link to={`/profile/${doc._id}`} className="btn btn-sm btn-info me-1">
                    Profile
                  </Link>
                  <Link to={`/edit/${doc._id}`} className="btn btn-sm btn-warning me-1">
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="7">No Doctors Found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorList;


