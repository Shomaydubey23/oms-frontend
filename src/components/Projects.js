import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from "sweetalert2";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    employeeIds: []
  });

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("");

  // Fetch Data
  const fetchProjects = async () => {
    const res = await fetch("http://localhost:8080/api/v1/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  };

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:8080/api/v1/employees");
    const data = await res.json();
    setEmployees(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "employeeIds") {
      const selected = Array.from(options)
        .filter(opt => opt.selected)
        .map(opt => Number(opt.value));

      setFormData({ ...formData, employeeIds: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Save Project (NO ID)
  const saveProject = async () => {
    if (!formData.title || !formData.description || !formData.status) {
      Swal.fire("Warning", "Fill all fields", "warning");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      employees: formData.employeeIds.map(id => ({ id }))
    };

    const endpoint = isEdit
      ? `http://localhost:8080/api/v1/projects/${formData.id}`
      : "http://localhost:8080/api/v1/projects";

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      fetchProjects();
      Swal.fire("Success", isEdit ? "Project Updated!" : "Project Added!", "success");

      setFormData({ title: "", description: "", status: "", employeeIds: [] });
      setShowModal(false);
      setIsEdit(false);
    } else {
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  // ✅ Edit
  const handleEdit = (project) => {
    setFormData({
      id: project.id, // needed for update only
      title: project.title,
      description: project.description,
      status: project.status,
      employeeIds: project.employees?.map(e => e.id) || []
    });

    setIsEdit(true);
    setShowModal(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      fetchProjects();
      Swal.fire("Deleted!", "Project removed", "success");
    } else {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // Filter + Sort
  const filteredProjects = projects
    .filter(p =>
      (p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || p.status === filterStatus)
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      return (a[sortField] || "")
        .toString()
        .localeCompare((b[sortField] || "").toString());
    });

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0 px-0 sticky-top">
        <div className="container-fluid px-2">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/home">
            <img src="/logo.png" alt="Logo" width="100" height="100" />
            <h3>Projects</h3>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
      <header className="text-center text-white" style={{ padding: "60px 0", background: "linear-gradient(to right, #004d40, #26a69a)" }}>
        <div className="container">
          <h1 className="fw-bold">Project Management</h1>
          <p className="lead">Manage your organization's projects efficiently.</p>
        </div>
      </header>

      {/* Filters */}
      <section className="container my-4">
        <div className="row g-3">
          <div className="col-md-4">
            <Form.Control
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <Form.Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">Filter by Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </Form.Select>
          </div>

          <div className="col-md-4">
            <Form.Select value={sortField} onChange={e => setSortField(e.target.value)}>
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
            </Form.Select>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="container my-5">
        <h3 className="mb-4">Projects</h3>
        <div className="row g-4">
          {filteredProjects.map(project => (
            <div className="col-md-4" key={project.id}>
              <div className="card p-3 shadow-sm">
                <h5>📌 {project.title}</h5>
                <p>{project.description}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Team:</strong> {project.employees?.map(e => e.name).join(", ") || "None"}</p>

                <div className="d-flex justify-content-between mt-3">
                  <Button size="sm" variant="warning" onClick={() => handleEdit(project)}>Update</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(project.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add */}
      <section className="container text-center my-5">
        <h4>Add New Project</h4>
        <Button onClick={() => { setShowModal(true); setIsEdit(false); }}>
          Add Project
        </Button>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Update" : "Add"} Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control placeholder="Title" name="title" value={formData.title} onChange={handleChange} className="mb-2" />
          <Form.Control placeholder="Description" name="description" value={formData.description} onChange={handleChange} className="mb-2" />

          <Form.Select name="status" value={formData.status} onChange={handleChange} className="mb-2">
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </Form.Select>

          <Form.Control as="select" multiple name="employeeIds" value={formData.employeeIds} onChange={handleChange}>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </Form.Control>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={saveProject}>{isEdit ? "Update" : "Add"}</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Projects;