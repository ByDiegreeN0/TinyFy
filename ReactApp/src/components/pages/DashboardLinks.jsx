import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/stylesPages/DashboardLinks.css";

export default function DashboardLinks() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [links, setLinks] = useState([
    { id: 1, name: "Example 1", shortUrl: "ex1.com", targetUrl: "https://example1.com", views: 100, createdAt: "2023-07-31" },
    { id: 2, name: "Example 2", shortUrl: "ex2.com", targetUrl: "https://example2.com", views: 200, createdAt: "2023-07-30" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const linksPerPage = 10;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") || sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/Signin");
    }
  }, [navigate]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLinks(links.filter(link => link.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
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
  const totalIncome = links.reduce((sum, link) => sum + link.views, 0) * 0.01;

  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDetails = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="dashboard"
    >
      <div className="card-container">
        <motion.div className="cards" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <h3>Number of links</h3>
          <p>{totalLinks}</p>
        </motion.div>
        <motion.div className="cards" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <h3>Links made in the month</h3>
          <p>{linksThisMonth}</p>
        </motion.div>
        <motion.div className="cards" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <h3>Total revenue generated</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </motion.div>
      </div>

      {links.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="link-form-container"
        >
          <h2>Shorten New Link</h2>
          <form onSubmit={handleSubmit} className="link-form">
            <div className="form-group">
              <label htmlFor="name">Link Name</label>
              <input id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="url">Link URL</label>
              <input id="url" name="url" type="url" required />
            </div>
            <button type="submit" className="btn-primary">Create</button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="link-management"
        >
          <div className="header">
            <h2>Links Management</h2>
            <button onClick={() => setShowModal(true)} className="btn-primary">Shorten Link</button>
          </div>
          <table className="link-table">
            <thead>
              <tr className="Title-tabla">
                <th>URL Name</th>
                <th>Short URL</th>
                <th>Target URL</th>
                <th>Views</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentLinks.map(link => (
                  <motion.tr
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{link.name}</td>
                    <td>{link.shortUrl}</td>
                    <td>{link.targetUrl}</td>
                    <td>{link.views}</td>
                    <td>{link.createdAt}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete(link.id)}>
                        <Trash2 className="icon" />
                        Eliminar
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          <div className="mobile-link-list">
            <AnimatePresence>
              {currentLinks.map(link => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mobile-link-card"
                >
                  <div className="mobile-link-header" onClick={() => toggleDetails(link.id)}>
                    <span className="mobile-link-name">{link.name}</span>
                    {expandedCard === link.id ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                  </div>
                  {expandedCard === link.id && (
                    <div className="mobile-link-details">
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Short URL:</span>
                        <span className="mobile-link-value">{link.shortUrl}</span>
                      </div>
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Target URL:</span>
                        <span className="mobile-link-value">{link.targetUrl}</span>
                      </div>
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Views:</span>
                        <span className="mobile-link-value">{link.views}</span>
                      </div>
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Created At:</span>
                        <span className="mobile-link-value">{link.createdAt}</span>
                      </div>
                      <button className="btn-delete" onClick={() => handleDelete(link.id)}>
                        <Trash2 className="icon" />
                        Eliminar
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastLink >= links.length}
              className="btn-secondary"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h2>Shorten New Link</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="modalName">Link Name</label>
                <input id="modalName" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="modalUrl">Link URL</label>
                <input id="modalUrl" name="url" type="url" required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content delete-modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to remove this link?</p>
            <div className="form-actions">
              <button onClick={confirmDelete} className="btn-delete">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}