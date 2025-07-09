import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false); // 👈 For toggling password visibility
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email === "dk@g.c" && user.password === "123456") {
      localStorage.setItem("auth", true);
      navigate("/");
    } else {
      setMsg("❌ Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h4 className="text-center mb-3">🔐 Admin Login</h4>
      {msg && <div className="alert alert-danger">{msg}</div>}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShow(!show)}
            >
              {show ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
