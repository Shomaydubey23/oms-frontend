import React from "react";

function Announcements() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0 px-0 sticky-top">
        <div className="container-fluid px-2">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/home">
            <img src="/logo.png" alt="Logo" width="100" height="100" />
            <h3>Announcements</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
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
        style={{
          padding: "60px 0",
          background: "linear-gradient(to right, #004d40, #26a69a)"
        }}
      >
        <div className="container">
          <h1 className="fw-bold">Announcements</h1>
          <p className="lead">Stay updated with the latest company news and events.</p>
        </div>
      </header>

      {/* Announcements Section */}
      <section className="container my-5">
        <h3 className="mb-4 text-center">Latest Updates</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>🎉 New Year Celebration</h5>
              <p>Join us for the annual celebration on 31st Dec.</p>
              <small className="text-muted">Posted on: 15th Dec 2024</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>📢 Policy Update</h5>
              <p>New HR guidelines have been introduced. Please review</p>
              <small className="text-muted">Posted on: 20th Dec 2024</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>🏆 Employee Awards</h5>
              <p>Recognizing outstanding performers this quarter.</p>
              <small className="text-muted">Posted on: 25th Dec 2024</small>
            </div>
          </div>
          {/* New Announcement Cards */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>📝 Training Sessions</h5>
              <p>Upcoming workshops on leadership and skill development.</p>
              <small className="text-muted">Posted on: 10th Jan 2025</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>🌐 Website Maintenance</h5>
              <p>Scheduled downtime for system updates on 15th Jan.Maintenance Update</p>
              <small className="text-muted">Posted on: 12th Jan 2025</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>🎯 New Project Kickoff</h5>
              <p>Launching the new client project with all teams involved.</p>
              <small className="text-muted">Posted on: 18th Jan 2025</small>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer
        className="text-center"
        style={{ backgroundColor: "#343a40", color: "white", padding: "20px 0" }}
      >
        <div className="container">
          <p className="mb-0">
            For any Update or Query <br />
            Contact : <u>9324331907</u>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Announcements;
