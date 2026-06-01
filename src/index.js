import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import Login from './Login';
import Homepage from './Homepage';

// Components
import Home from "./components/Home";
import Workforce from './components/Workforce';
import Projects from "./components/Projects";
import KnowledgeBase from "./components/KnowledgeBase";
import Announcements from "./components/Announcements";

// Get user
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Protected Route
const ProtectedRoute = ({ element }) => {
  const user = getCurrentUser();
  return user ? element : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>

      {/* Public */}
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/workforce" element={<ProtectedRoute element={<Workforce />} />} />
      <Route path="/projects" element={<ProtectedRoute element={<Projects />} />} />
      <Route path="/knowledgebase" element={<ProtectedRoute element={<KnowledgeBase />} />} />
      <Route path="/announcements" element={<ProtectedRoute element={<Announcements />} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  </Router>
);