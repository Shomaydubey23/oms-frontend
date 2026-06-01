import React, { useState, useEffect } from "react";

export default function Home() {
  const [projects, setProjects] = useState([]);

  // Fetch top 3 completed projects with their employees without try/catch
  const fetchCompletedProjects = async () => {
    const res = await fetch("http://localhost:8080/api/v1/projects/completed?limit=3");
    if (!res.ok) {
      console.error("Failed to fetch completed projects:", res.statusText);
      return;
    }
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchCompletedProjects();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0 px-0 sticky-top">
        <div className="container-fluid px-2">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/home">
            <img src="/logo.png" alt="Logo" width="100" height="100" />
            <h3>CHΞINTRIX</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/workforce"><h5>WorkForce</h5></a></li>
              <li className="nav-item"><a className="nav-link" href="/projects"><h5>Projects</h5></a></li>
              <li className="nav-item"><a className="nav-link" href="/knowledgebase"><h5>Knowledge Base</h5></a></li>
              <li className="nav-item"><a className="nav-link" href="/announcements"><h5>Announcements</h5></a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header
        className="text-center text-white"
        style={{ padding: "60px 0", background: "linear-gradient(to right, #004d40, #26a69a)" }}
      >
        <div className="container">
          <h1 className="fw-bold">Welcome to CHΞINTRIX</h1>
          <p className="lead">Your Office Management System</p>
        </div>
      </header>

      {/* Completed Projects Section */}
      <section className="container my-5">
        <h3 className="mb-4">Completed Projects</h3>
        <div className="row g-4">
          {projects.length === 0 ? (
            <p>No completed projects available.</p>
          ) : (
            projects.map(project => (
              <div className="col-md-4" key={project.id}>
                <div className="card p-3 shadow-sm">
                  <h5>📌 {project.title}</h5>
                  <p>{project.description}</p>
                  <p>Status: {project.status}</p>

                  {/* Employee cards */}
                  <div className="mt-3">
                    <h6>Team Leader:</h6>
                    {project.employees && project.employees.length > 0 ? (
                      project.employees.map(emp => (
                        <div
                          key={emp.id}
                          className="card p-2 mb-2 bg-light shadow-sm"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <p className="mb-1">👤 {emp.name}</p>
                          <p className="mb-0">Role: {emp.role}</p>
                          <p className="mb-0">Email: {emp.email}</p>
                        </div>
                      ))
                    ) : (
                      <p>No employees assigned.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center" style={{ backgroundColor: "#343a40", color: "white", padding: "20px 0" }}>
        <div className="container">
          <p className="mb-0">
            For any Update or Query <br /> Contact : <u>9324331907</u>
          </p>
        </div>
      </footer>
    </>
  );
}
