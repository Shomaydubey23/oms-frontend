import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

function Workforce() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    departmentId: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [sortField, setSortField] = useState("");

  // Fetch Data
  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:8080/api/v1/employees");
    const data = await res.json();
    setEmployees(Array.isArray(data) ? data : []);
  };

  const fetchDepartments = async () => {
    const res = await fetch("http://localhost:8080/api/v1/departments");
    const data = await res.json();
    setDepartments(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Save Employee
  const saveEmployee = async () => {
    if (!formData.name || !formData.email || !formData.role || !formData.departmentId) {
      Swal.fire("Warning", "Please fill all fields", "warning");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: { id: Number(formData.departmentId) },
    };

    if (isEdit) {
      payload.id = Number(formData.id);
    }

    const endpoint = isEdit
      ? `http://localhost:8080/api/v1/employees/${formData.id}`
      : "http://localhost:8080/api/v1/employees";

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchEmployees();
      Swal.fire("Success", isEdit ? "Employee Updated!" : "Employee Added!", "success");

      setFormData({
        id: "",
        name: "",
        email: "",
        role: "",
        departmentId: "",
      });

      setShowModal(false);
      setIsEdit(false);
    } else {
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  const handleEdit = (emp) => {
    setFormData({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      departmentId: emp.department?.id || "",
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete employee permanently!",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:8080/api/v1/employees/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchEmployees();
      Swal.fire("Deleted!", "Employee removed", "success");
    } else {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // Filter + Sort
  const filteredEmployees = employees
    .filter((emp) =>
      (emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDept === "" || emp.department?.id === Number(selectedDept))
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
            <h3>Workforce</h3>
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
      <header
        className="text-center text-white"
        style={{
          padding: "60px 0",
          background: "linear-gradient(to right, #004d40, #26a69a)",
        }}
      >
        <div className="container">
          <h1 className="fw-bold">Workforce Management</h1>
          <p className="lead">Manage your organization's employees efficiently.</p>
        </div>
      </header>

      {/* Filters */}
      <section className="container my-4">
        <div className="row g-3">
          <div className="col-md-4">
            <Form.Control
              type="text"
              placeholder="Search by name/email/role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <Form.Select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              <option value="">-- Filter by Department --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Form.Select>
          </div>

          <div className="col-md-4">
            <Form.Select value={sortField} onChange={(e) => setSortField(e.target.value)}>
              <option value="">-- Sort by --</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </Form.Select>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="container my-5">
        <h3 className="mb-4">Our Employees</h3>
        <div className="row g-4">
          {filteredEmployees.map((emp) => (
            <div className="col-md-4" key={emp.id}>
              <div className="card p-3 shadow-sm">
                <h5>👤 {emp.name}</h5>
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Role:</strong> {emp.role}</p>
                <p><strong>Department:</strong> {emp.department?.name || "N/A"}</p>

                <div className="d-flex justify-content-between mt-3">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(emp)}>Update</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Section */}
      <section className="container my-5 text-center">
        <h3>Add New Employee</h3>
        <p>Expand your team and manage workforce effectively.</p>
        <Button variant="primary" size="lg" onClick={() => { setShowModal(true); setIsEdit(false); }}>
          Add Employee
        </Button>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Update Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Role" name="role" value={formData.role} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Select name="departmentId" value={formData.departmentId} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={saveEmployee}>
            {isEdit ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Workforce;