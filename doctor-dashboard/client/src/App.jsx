// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddDoctorForm from "./Components/AddDoctorForm";
// import DoctorList from "./Components/DoctorList";
// import EditDoctor from "./Components/EditDoctor";
// import Header from "./Components/Header";
// import DoctorProfile from "./Components/DoctorProfile";

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<DoctorList />} />
//         <Route path="/doctors" element={<AddDoctorForm />} />
//         <Route path="/profile/:id" element={<DoctorProfile />} />
//         <Route path="/edit/:id" element={<EditDoctor />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// // AddDoctorForm


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddDoctorForm from "./Components/AddDoctorForm";
import DoctorList from "./Components/DoctorList";
import EditDoctor from "./Components/EditDoctor";
import Header from "./Components/Header";
import DoctorProfile from "./Components/DoctorProfile";
import Login from "./pages/Login";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DoctorList />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <AddDoctorForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditDoctor />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <DoctorProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
