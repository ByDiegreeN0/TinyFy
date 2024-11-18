import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import "../styles/stylesPages/DashboardLinks.css";
import LoadingScreen from "../Common/LoadingScreen";
import useTokenValidation from "../hooks/useTokenValidation";
import LinkTable from "../Common/LinkTable";
import DeleteLinkModal from "../Common/DeleteLinkModal";
import CreateLinkForm from "../Common/CreateLinkForm";

export default function DashboardLinks() {
  const navigate = useNavigate();
  useTokenValidation();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const linksPerPage = 10;

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken = JSON.parse(window.atob(base64));
        if (decodedToken && decodedToken.sub) {
          console.log("User ID extracted from token:", decodedToken.sub);
          return decodedToken.sub;
        } else {
          console.error("Decoded token does not contain a user ID.");
          return null;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    } else {
      console.log("No token found in localStorage.");
      return null;
    }
  };

  const userId = getUserIdFromToken();
  const userLinks = links.filter((link) => link.userId === userId);

  const fetchLinks = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = getUserIdFromToken();
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/links?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
        setFilteredLinks(data);
        console.log("Fetched links:", data);
      } else {
        console.error("Error fetching links");
      }
    } catch (error) {
      console.error("Error fetching links:", error);
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
        setFilteredLinks(
          filteredLinks.filter((link) => link.LinkId !== linkToDelete)
        );
        setLinks(links.filter((link) => link.LinkId !== linkToDelete));
        console.log(`Link with ID ${linkToDelete} deleted successfully`);
      } else {
        const errorText = await response.text();
        console.error(
          `Error deleting the link with ID ${linkToDelete}: ${errorText}`
        );
      }
    } catch (error) {
      console.error(`Error deleting the link with ID ${linkToDelete}:`, error);
    }
    setShowDeleteModal(false);
    setLinkToDelete(null);
  };

  const handleSubmit = async (newLink) => {
    setIsLoading(true);
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("Unable to create link because no user ID was found.");
      setIsLoading(false);
      return;
    }

    const linkWithUserId = {
      ...newLink,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(linkWithUserId),
      });
      if (response.ok) {
        await fetchLinks();
        setShowModal(false);
        console.log("Link created successfully.");
      } else {
        console.error("Error creating the link");
      }
    } catch (error) {
      console.error("Error creating the link:", error);
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
          <h3>Links made in the month</h3>
          <p>{linksThisMonth}</p>
        </motion.div>

        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Aviable Earnings</h3>
          <p>${totalLinks}</p>
        </motion.div>
        
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Total revenue generated</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </motion.div>
        <motion.div
          className="cards CPMCard"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Today´s CPM</h3>
          <div className="trend">
            <p>${totalIncome.toFixed(2)}</p>
          </div>
        </motion.div>
      </div>

      {userLinks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="link-form-container"
        >
          <h2>Shorten New Link</h2>
          <CreateLinkForm
            onSubmit={handleSubmit}
            isModal={false}
            onCancel={() => setShowModal(false)}
          />
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
            links={filteredLinks}
            expandedCard={expandedCard}
            toggleDetails={toggleDetails}
            setLinkToDelete={setLinkToDelete}
            setShowDeleteModal={setShowDeleteModal}
            currentPage={currentPage}
            linksPerPage={linksPerPage}
            userId={getUserIdFromToken()}
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
              disabled={indexOfLastLink >= filteredLinks.length}
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
            <CreateLinkForm
              onSubmit={handleSubmit}
              isModal={true}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteLinkModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </motion.div>
  );
}
