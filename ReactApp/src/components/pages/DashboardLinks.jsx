import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/stylesPages/DashboardLinks.css";

export default function DashboardLinks() {
  // Hooks de React para manejar el estado
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de creación de enlace
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para mostrar el modal de eliminación
  const [deleteId, setDeleteId] = useState(null); // ID del enlace que se va a eliminar
  const [links, setLinks] = useState([]); // Lista de enlaces
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [expandedCard, setExpandedCard] = useState(null); // Tarjeta expandida en la vista móvil
  const linksPerPage = 10; // Cantidad de enlaces por página

  // Hook para verificar autenticación al cargar el componente
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") ||
      sessionStorage.getItem("isAuthenticated");

    // Si no está autenticado, redirigir a la página de inicio de sesión
    if (!isAuthenticated) {
      navigate("/Signin");
    } else {
      // Si está autenticado, cargar los enlaces
      fetchLinks();
    }
  }, [navigate]);

 // Función para obtener los enlaces desde la API
const fetchLinks = async () => {
  try {
    const response = await fetch("http://localhost:8000/links"); // Agregar http://
    if (response.ok) {
      const data = await response.json();
      setLinks(data);
    } else {
      console.error("Error al obtener los enlaces");
    }
  } catch (error) {
    console.error("Error al obtener los enlaces:", error);
  }
};

// Manejar la eliminación de un enlace
const handleDelete = (id) => {
  setDeleteId(id); // Establecer el ID del enlace que se va a eliminar
  setShowDeleteModal(true); // Mostrar el modal de confirmación
};

// Confirmar la eliminación del enlace
const confirmDelete = async () => {
  try {
    const response = await fetch(`http://localhost:8000/links/${deleteId}`, { // Agregar http://
      method: "DELETE",
    });
    if (response.ok) {
      setLinks(links.filter((link) => link.LinkId !== deleteId)); // Eliminar el enlace de la lista
      setShowDeleteModal(false); // Cerrar el modal
      setDeleteId(null); // Resetear el ID de eliminación
    } else {
      console.error("Error al eliminar el enlace");
    }
  } catch (error) {
    console.error("Error al eliminar el enlace:", error);
  }
};

// Manejar el envío del formulario para crear un nuevo enlace
const handleSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const url = e.target.url.value;
  const shortUrl = "";
  const newLink = {
    LinkName: name,
    LinkUrl: url,
    LinkShortUrl: shortUrl,
    ClickCount: 0,
    CreatedAt: new Date().toISOString(), // Fecha de creación
  };
  try {
    const response = await fetch("http://localhost:8000/links", { // Agregar http://
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    });
    if (response.ok) {
      fetchLinks(); // Refrescar los enlaces después de crear uno nuevo
      setShowModal(false); // Cerrar el modal de creación
    } else {
      console.error("Error al crear el enlace");
    }
  } catch (error) {
    console.error("Error al crear el enlace:", error);
  }
};
  // Calcular estadísticas para mostrar en el dashboard
  const totalLinks = links.length; // Total de enlaces
  const linksThisMonth = links.filter((link) => {
    const createdDate = new Date(link.CreatedAt);
    const currentDate = new Date();
    return (
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getFullYear() === currentDate.getFullYear()
    );
  }).length; // Total de enlaces creados en el mes actual

  // Total de ingresos generados por todos los enlaces
  const totalIncome = links.reduce(
    (sum, link) => sum + (link.Earnings || 0),
    0
  );

  // Manejar la paginación
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Cambiar de página

  // Alternar la expansión de detalles de un enlace en la vista móvil
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
      {/* Sección de estadísticas */}
      <div className="card-container">
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Número de enlaces</h3>
          <p>{totalLinks}</p>
        </motion.div>
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Enlaces creados este mes</h3>
          <p>{linksThisMonth}</p>
        </motion.div>
        <motion.div
          className="cards"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Ingresos totales generados</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Si no hay enlaces, mostrar el formulario para crear uno */}
      {links.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="link-form-container"
        >
          <h2>Acortar Nuevo Enlace</h2>
          <form onSubmit={handleSubmit} className="link-form">
            <div className="form-group">
              <label htmlFor="name">Nombre del Enlace</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL del Enlace</label>
              <input id="url" name="url" type="url" required />
            </div>
            <button type="submit" className="btn-primary">
              Crear
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
          {/* Administración de enlaces */}
          <div className="header">
            <h2>Gestión de Enlaces</h2>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Acortar Enlace
            </button>
          </div>
          <table className="link-table">
            <thead>
              <tr className="Title-tabla">
                <th>Nombre del URL</th>
                <th>URL Corto</th>
                <th>URL de Destino</th>
                <th>Vistas</th>
                <th>Creado El</th>
                <th>Acciones</th>
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
                        onClick={() => handleDelete(link.LinkId)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}
