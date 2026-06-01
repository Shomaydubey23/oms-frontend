import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// NOTE: Removed bootstrap-icons import. Using CDN in public/index.html

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid"> {/* use container-fluid for full width */}
    <span className="navbar-brand fw-bold">Office Management System</span>
  </div>
</nav>


      {/* Hero Section */}
      <section
        className="hero"
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "#ffffff",
          borderBottom: "2px solid #e9ecef",
        }}
      >
        <div className="container">
          <h1 style={{ fontWeight: 700, color: "#0d6efd" }}>
            Welcome to Office Management System
          </h1>
          <p className="lead mt-3">
            A simple platform to manage employees, projects, and reports — all in one place.
          </p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features text-center" style={{ padding: "60px 20px" }}>
        <div className="container">
          <h2 className="mb-5 fw-bold">What You Can Do with OMS</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="card feature-card p-4"
                style={{ border: "none", borderRadius: "12px", boxShadow: "0px 3px 8px rgba(0,0,0,0.1)", transition: "all 0.3s ease-in-out" }}
              >
                <i className="bi bi-people-fill fs-1 text-primary"></i>
                <h5 className="mt-3">Manage Employees</h5>
                <p>Keep track of all employees, their departments, and their roles easily.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card feature-card p-4"
                style={{ border: "none", borderRadius: "12px", boxShadow: "0px 3px 8px rgba(0,0,0,0.1)", transition: "all 0.3s ease-in-out" }}
              >
                <i className="bi bi-kanban fs-1 text-success"></i>
                <h5 className="mt-3">Track Projects</h5>
                <p>Assign projects, monitor deadlines, and ensure smooth collaboration.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card feature-card p-4"
                style={{ border: "none", borderRadius: "12px", boxShadow: "0px 3px 8px rgba(0,0,0,0.1)", transition: "all 0.3s ease-in-out" }}
              >
                <i className="bi bi-bar-chart-line-fill fs-1 text-warning"></i>
                <h5 className="mt-3">Generate Reports</h5>
                <p>Create insightful reports for better decision-making and growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="stats text-center"
        style={{ background: "#0d6efd", color: "white", padding: "50px 20px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h2>100+</h2>
              <p>Offices Managed</p>
            </div>
            <div className="col-md-3">
              <h2>500+</h2>
              <p>Employees</p>
            </div>
            <div className="col-md-3">
              <h2>50+</h2>
              <p>Projects Completed</p>
            </div>
            <div className="col-md-3">
              <h2>24/7</h2>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to Simplify Office Work?</h2>
          <p className="mb-4">Join OMS today and experience smarter office management.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center" style={{ background: "#212529", color: "#ddd", padding: "20px 10px", fontSize: "14px" }}>
        <p className="mb-1">© 2025 Office Management System</p>
        <small>support@oms.com | +91-9876543210</small>
      </footer>
    </div>
  );
}
