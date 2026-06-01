import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const endpoint = isLogin
      ? "http://localhost:8080/api/v1/users/login"
      : "http://localhost:8080/api/v1/users/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok || !result.data) {
        Swal.fire({
          icon: "error",
          title: result.message || "Invalid credentials",
          timer: 2500,
          showConfirmButton: false,
        });
        return;
      }

      // ✅ Success
      Swal.fire({
        icon: "success",
        title: isLogin ? "Login successful" : "Signup successful",
        timer: 1500,
        showConfirmButton: false,
      });

      if (isLogin) {
        // Store user
        localStorage.setItem("user", JSON.stringify(result.data));

        // ✅ Always redirect to home
        navigate("/home");
      } else {
        setIsLogin(true);
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server error",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #031b33, #5b7c9c)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "30px",
          border: "2px solid #067434",
          borderRadius: "10px",
          backgroundColor: "rgba(6, 117, 80, 0.85)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-3">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            style={{
              color: "#00e676",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={toggleMode}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;