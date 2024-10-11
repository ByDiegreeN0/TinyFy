import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import LoadingScreen from "../Common/LoadingScreen";
import CreateLinkForm from "../Common/CreateLinkForm";
import DeleteLinkModal from "../Common/DeleteLinkModal";
import "../styles/stylesPages/DashboardLinks.css";

export default function DashboardLinks() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      navigate("/Signin");
    } else {
      fetchLinks();
    }
  }, [navigate, token]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const linksPerPage = 10;

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/links", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      } else {
        console.error("Error al obtener los enlaces");
      }
    } catch (error) {
      console.error("Error al obtener los enlaces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLink = async (newLink) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newLink),
      });
      if (response.ok) {
        await fetchLinks();
        setShowModal(false);
      } else {
        console.error("Error al crear el enlace");
      }
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    await handleDelete(linkToDelete);
    setShowDeleteModal(false);
    setLinkToDelete(null);
  };

  const handleDelete = async (linkId) => {
    try {
      const response = await fetch(`http://localhost:8000/links/${linkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setLinks(links.filter(link => link.LinkId !== linkId));
        console.log(`Enlace con ID ${linkId} eliminado correctamente`);
      } else {
        const errorText = await response.text();
        console.error(`Error al eliminar el enlace con ID ${linkId}: ${errorText}`);
      }
    } catch (error) {
      console.error(`Error al eliminar el enlace con ID ${linkId}:`, error);
    }
  };

  const totalLinks = links.length;
  const linksThisMonth = links.filter((link) => {
    const createdDate = new Date(link.CreatedAt);
    const currentDate = new Date();
    return (
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;
  const totalIncome = links.reduce(
    (sum, link) => sum + (link.Earnings || 0),
    0
  );

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
      {isLoading && <LoadingScreen />}
      <div className="card-container">
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Number of links</h3>
          <p>{totalLinks}</p>
        </motion.div>
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Links made in the month</h3>
          <p>{linksThisMonth}</p>
        </motion.div>
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
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
          <CreateLinkForm onSubmit={handleCreateLink} isModal={false} />
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
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Shorten Link
            </button>
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
                {currentLinks.map((link) => (
                  <motion.tr
                    key={link.LinkId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{link.LinkName}</td>
                    <td>{link.LinkShortUrl}</td>
                    <td>{link.LinkUrl}</td>
                    <td>{link.ClickCount}</td>
                    <td>{new Date(link.CreatedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setLinkToDelete(link.LinkId);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="icon" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          <div className="mobile-link-list">
            <AnimatePresence>
              {currentLinks.map((link) => (
                <motion.div
                  key={link.LinkId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mobile-link-card"
                >
                  <div
                    className="mobile-link-header"
                    onClick={() => toggleDetails(link.LinkId)}
                  >
                    <span className="mobile-link-name">{link.LinkName}</span>
                    {expandedCard === link.LinkId ? (
                      <ChevronUp className="icon" />
                    ) : (
                      <ChevronDown className="icon" />
                    )}
                  </div>
                  {expandedCard === link.LinkId && (
                    <div className="mobile-link-details">
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Short URL:</span>
                        <span className="mobile-link-value">
                          {link.LinkShortUrl}
                        </span>
                      </div>
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Target URL:</span>
                        <span className="mobile-link-value">
                          {link.LinkUrl}
                        </span>
                      </div>
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Views:</span>
                        <span className="mobile-link-value">
                          {link.ClickCount}
                        </span>
                      </div>
                      <div className="mobile-link-detail">
                        <span className="mobile-link-label">Created At:</span>
                        <span className="mobile-link-value">
                          {new Date(link.CreatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setLinkToDelete(link.LinkId);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="icon" />
                        Delete
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
              className="btn-primary"
            >
              Back
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastLink >= links.length}
              className="btn-primary"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>Shorten New Link</h2>
            <CreateLinkForm onSubmit={handleCreateLink} isModal={true} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteLinkModal 
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </motion.div>
  );
}