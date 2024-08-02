import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Example from "../Common/SimpleBarChart";
import "../styles/stylesPages/DashboardLinks.css";

const DashboardLinks = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState([
    { id: 1, name: "Example 1", shortUrl: "ex1.com", targetUrl: "https://example1.com", views: 100, createdAt: "2023-07-31" },
    { id: 2, name: "Example 2", shortUrl: "ex2.com", targetUrl: "https://example2.com", views: 200, createdAt: "2023-07-30" },
  ]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") || sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/Signin");
    }
  }, [navigate]);

  const handleDelete = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    const newLink = {
      id: links.length + 1,
      name,
      shortUrl: `short${links.length + 1}.com`,
      targetUrl: url,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLinks([...links, newLink]);
    setShowModal(false);
  };

  return (
    <div className="dashboard animationFade">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Gráfico Mensual</h2>
          </div>
          <div className="card-content">
            <Example />
          </div>
        </div>
      </div>
      
      <div className="link-management">
        <button className="shorten-link-btn" onClick={() => setShowModal(true)}>Acortar Link</button>
        <table className="link-table">
          <thead>
            <tr>
              <th>URL Name</th>
              <th>Short URL</th>
              <th>Target URL</th>
              <th>Views</th>
              <th>Created At</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {links.map(link => (
              <tr key={link.id}>
                <td>{link.name}</td>
                <td>{link.shortUrl}</td>
                <td>{link.targetUrl}</td>
                <td>{link.views}</td>
                <td>{link.createdAt}</td>
                <td><button onClick={() => handleDelete(link.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Acortar Nuevo Link</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Link Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="url">Link URL</label>
                <input type="url" id="url" name="url" required />
              </div>
              <div className="form-actions">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLinks;