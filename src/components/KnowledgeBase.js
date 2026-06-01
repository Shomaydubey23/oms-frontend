import React, { useState } from "react";

function KnowledgeBase() {
  const [expandedCard, setExpandedCard] = useState(null);

  const articles = [
    {
      id: 1,
      title: "📘 Company Handbook",
      summary: "Guidelines, policies, and employee rights.",
      details: "Full company handbook with detailed policies, employee rights, onboarding processes, and important contacts."
    },
    {
      id: 2,
      title: "💻 IT Troubleshooting",
      summary: "Solutions for common system and network issues.",
      details: "Complete guide for IT troubleshooting, including software installation, network issues, VPN setup, and support contacts."
    },
    {
      id: 3,
      title: "🧾 HR Policies",
      summary: "Leave policy, code of conduct, and more.",
      details: "Full HR policy details including leave, attendance, performance review, grievance handling, and code of conduct."
    },
    {
      id: 4,
      title: "📈 Project Management Tips",
      summary: "Best practices for managing projects.",
      details: "Detailed project management tips, timelines, resource allocation, risk management, and reporting techniques."
    },
    {
      id: 5,
      title: "🎓 Learning Resources",
      summary: "Training materials and tutorials for employees.",
      details: "Comprehensive learning resources, courses, tutorials, and recommended reading for skill development."
    },
    {
      id: 6,
      title: "🔒 Security Guidelines",
      summary: "Important info on company security practices.",
      details: "In-depth security guidelines, password policies, data protection measures, and safe handling of sensitive information."
    }
  ];

  const toggleDetails = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0 px-0 sticky-top">
        <div className="container-fluid px-2">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/home">
            <img src="/logo.png" alt="Logo" width="100" height="100" />
            <h3>KnowledgeBase</h3>
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
          <h1 className="fw-bold">Knowledge Base</h1>
          <p className="lead">Your one-stop hub for company policies, FAQs, and learning materials.</p>
        </div>
      </header>

      {/* Knowledge Cards */}
      <section className="container my-5">
        <h3 className="mb-4 text-center">Popular Articles</h3>
        <div className="row g-4">
          {articles.map((article) => (
            <div key={article.id} className="col-md-4">
              <div className="card p-3 shadow-sm">
                <h5>{article.title}</h5>
                <p>{expandedCard === article.id ? article.details : article.summary}</p>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => toggleDetails(article.id)}
                >
                  {expandedCard === article.id ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
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

export default KnowledgeBase;
