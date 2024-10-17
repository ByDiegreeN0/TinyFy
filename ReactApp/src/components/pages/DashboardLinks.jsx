import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/stylesPages/DashboardLinks.css";
import LoadingScreen from "../Common/LoadingScreen";
import useTokenValidation from "../hooks/useTokenValidation";
import LinkTable from "../Common/LinkTable";

export default function DashboardLinks() {
  const navigate = useNavigate(); 
  useTokenValidation();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const linksPerPage = 10;

  const fetchLinks = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId"); // Asumimos que el ID del usuario se guarda en el almacenamiento local
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/links", {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-ID": userId, // Enviamos el ID del usuario en los headers
        },
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

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async () => {
    if (!linkToDelete) {
      console.error("No link ID specified for deletion.");
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/links/${linkToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setLinks(links.filter((link) => link.LinkId !== linkToDelete));
        console.log(`Enlace con ID ${linkToDelete} eliminado correctamente`);
      } else {
        const errorText = await response.text();
        console.error(
          `Error al eliminar el enlace con ID ${linkToDelete}: ${errorText}`
        );
      }
    } catch (error) {
      console.error(
        `Error al eliminar el enlace con ID ${linkToDelete}:`,
        error
      );
    }
    setShowDeleteModal(false);
    setLinkToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = e.target.name.value;
    const url = e.target.url.value;
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const newLink = {
      LinkUrl: url,
      LinkName: name,
      ClickCount: 0,
      CreatedAt: new Date().toISOString(),
      UserId: userId, // Incluimos el ID del usuario al crear un nuevo enlace
    };
    try {
      const response = await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          <form onSubmit={handleSubmit} className="link-form">
            <div className="form-group">
              <label htmlFor="name">Link Name</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div className="form-group">
              <label htmlFor="url">Link URL</label>
              <input id="url" name="url" type="url" required />
            </div>
            <button type="submit" className="btn-primary">
              Create
            </button>
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
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Shorten Link
            </button>
          </div>
          <LinkTable 
            links={links}
            expandedCard={expandedCard}
            toggleDetails={toggleDetails}
            setLinkToDelete={setLinkToDelete}
            setShowDeleteModal={setShowDeleteModal}
            currentPage={currentPage}
            linksPerPage={linksPerPage}
          />
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
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
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
                <button type="submit" className="btn-primary">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm deletion</h2>
            <p>Are you sure you want to remove this link?</p>
            <div className="form-actions">
              <button onClick={handleDelete} className="btn-delete">
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}