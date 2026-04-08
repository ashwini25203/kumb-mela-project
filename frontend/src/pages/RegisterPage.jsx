import { useState } from "react";
import "../App.css";

export default function Register({ goToLogin }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setMessage(result.message);

      if (res.ok) {
        setTimeout(() => goToLogin(), 1500);
      }
    } catch {
      setMessage("Server Error");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={register}>
        <h2>Create Account</h2>

        <input className="input" placeholder="Full Name" required
          onChange={(e) => setData({ ...data, name: e.target.value })} />

        <input className="input" type="email" placeholder="Email" required
          onChange={(e) => setData({ ...data, email: e.target.value })} />

        <input className="input" type="tel" placeholder="Phone" required
          onChange={(e) => setData({ ...data, phone: e.target.value })} />

        <select className="input" required
          onChange={(e) => setData({ ...data, role: e.target.value })}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="password-box">
          <input className="input"
            type={show ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <span className="eye" onClick={() => setShow(!show)}>
            👁
          </span>
        </div>

        <button type="submit">Register</button>

        {message && <p className="msg">{message}</p>}

        <p className="text">
          Already have account?{" "}
          <span className="link" onClick={goToLogin}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}