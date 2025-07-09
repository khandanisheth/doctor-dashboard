import axios from "axios";
const API = "http://localhost:3001/api";
const DoctorServices = {
  dataCreate(fromData) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(`${API}/adddoctor`, fromData, config);
  },

  dataGet: () => {
    return axios.get(`${API}/alldoctor`); // ✅ changed to GET
  },

  getDoctorById: (id) => {
    return axios.get(`${API}/getdoctor/${id}`);
  },

  deleteDoctor(id) {
    return axios.delete(`${API}/deletedoctor/${id}`);
  },
  updateDoctor(id, formData) {
    return axios.put(`${API}/updatedoctor/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default DoctorServices;
