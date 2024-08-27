import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/stylesPages/DashboardLinks.css";

const DashboardLinks = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState([
    { id: 1, name: "Example 1", shortUrl: "ex1.com", targetUrl: "https://example1.com", views: 100, createdAt: "2023-07-31" },
    { id: 2, name: "Example 2", shortUrl: "ex2.com", targetUrl: "https://example2.com", views: 200, createdAt: "2023-07-30" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const linksPerPage = 10;

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

  const totalLinks = links.length;
  const linksThisMonth = links.filter(link => {
    const createdDate = new Date(link.createdAt);
    const currentDate = new Date();
    return createdDate.getMonth() === currentDate.getMonth() && createdDate.getFullYear() === currentDate.getFullYear();
  }).length;
  const totalIncome = links.reduce((sum, link) => sum + link.views, 0) * 0.01; // Assuming $0.01 per view

  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard animationFade">
      <div className="cards-container">
        <div className="cardLinks">
          <h3>Cantidad de links</h3>
          <p>{totalLinks}</p>
        </div>
        <div className="cardLinks">
          <h3>Links hechos en el mes</h3>
          <p>{linksThisMonth}</p>
        </div>
        <div className="cardLinks">
          <h3>Ingresos totales generados</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
      </div>
      
      {links.length === 0 ? (
        <div className="link-form-container">
          <div className="link-form-header">
            <h2 className="link-form-title">Acortar Nuevo Link</h2>
          </div>
          <div className="link-form-content">
            <form className="link-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Link Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="url">Link URL</label>
                <input type="url" id="url" name="url" required />
              </div>
              <button type="submit" className="link-form-submit">Crear</button>
            </form>
          </div>
        </div>
      ) : (
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
              {currentLinks.map(link => (
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
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastLink >= links.length}>Siguiente</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Acortar Nuevo Link</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="modalName">Link Name</label>
                <input type="text" id="modalName" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="modalUrl">Link URL</label>
                <input type="url" id="modalUrl" name="url" required />
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