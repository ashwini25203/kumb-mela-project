import { useState } from "react";
import "../App.css";

export default function Login({ goToRegister }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setMessage(result.message);
    } catch {
      setMessage("Server Error");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={login}>
        <h2>Welcome Back</h2>

        <select
          className="input"
          required
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          className="input"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <div className="password-box">
          <input
            className="input"
            type={show ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <span className="eye" onClick={() => setShow(!show)}>
            👁
          </span>
        </div>

        <button type="submit">Login</button>

        {/* SUCCESS / ERROR MESSAGE */}
        {message && <p className="msg">{message}</p>}

        <p className="text">
          Don't have account?{" "}
          <span className="link" onClick={goToRegister}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}