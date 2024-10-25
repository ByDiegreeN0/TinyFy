import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

const LinkTable = ({
  links,
  expandedCard,
  toggleDetails,
  setLinkToDelete,
  setShowDeleteModal,
  currentPage,
  linksPerPage,
  userId,
}) => {
  const filteredLinks = links.filter((link) => link.userId === userId);
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstLink, indexOfLastLink);
  const pageDomain = "http://localhost:5173/"; {/* Esto se tiene que cambiar en el momento que se pase a produccion y tengamos un dominio real */ }

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(pageDomain + shortUrl);
    alert('ShortUrl link copied to clipboard!');
  };
  


  return (
    <>
      <table className="link-table">
        <thead>
          <tr className="Title-tabla">
            <th>URL Name</th>
            <th>Short URL</th>
            <th>Target URL</th>
            <th>Views</th>
            <th>Incomes</th>
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
                <td
                  onClick={() => copyToClipboard(link.LinkShortUrl)}
                  role="button"
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  
                >
                  {pageDomain + link.LinkShortUrl}
                </td>

                {/* Yo se que eso se ve feo, los estilos se los dejo al viejo carlos, esto solo lo hice para adelantar las tareas :D */}
                <td><a className='TargetLink transitionBorder' href={link.LinkUrl} target="_blank" rel="noopener noreferrer">Target</a></td>
                <td>{link.ClickCount}</td>
                <td>{link.Earnings}</td>
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
                    <span className="mobile-link-value">{link.LinkUrl}</span>
                  </div>
                  <div className="mobile-link-detail">
                    <span className="mobile-link-label">Views:</span>
                    <span className="mobile-link-value">{link.ClickCount}</span>
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
    </>
  );
};

export default LinkTable;