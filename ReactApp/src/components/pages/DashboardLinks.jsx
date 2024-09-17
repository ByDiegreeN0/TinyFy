import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/stylesPages/DashboardLinks.css";
import LoadingScreen from "../Common/LoadingScreen";

// Este es el componente principal del Dashboard que gestiona los enlaces
export default function DashboardLinks() {
  const navigate = useNavigate(); // Hook de react-router-dom para navegar entre rutas
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal de crear enlace
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para manejar el modal de eliminación
  const [links, setLinks] = useState([]); // Estado para almacenar los enlaces obtenidos
  const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación
  const [expandedCard, setExpandedCard] = useState(null); // Estado para manejar qué tarjeta móvil está expandida
  const [linkToDelete, setLinkToDelete] = useState(null); // Estado para almacenar el ID del enlace a eliminar
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la pantalla de carga
  const linksPerPage = 10; // Número de enlaces por página

  // Este efecto se ejecuta cuando el componente se monta para verificar la autenticación y obtener los enlaces
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") ||
      sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/Signin"); // Redirige a la página de inicio de sesión si no está autenticado
    } else {
      fetchLinks(); // Obtiene los enlaces si está autenticado
    }
  }, [navigate]);

  // Función para obtener los enlaces desde el backend
  const fetchLinks = async () => {
    setIsLoading(true); // Muestra la pantalla de carga mientras se obtienen los datos
    try {
      const response = await fetch("http://localhost:8000/links"); // Petición al backend
      if (response.ok) {
        const data = await response.json(); // Obtiene los datos en formato JSON
        setLinks(data); // Guarda los enlaces en el estado
      } else {
        console.error("Error al obtener los enlaces");
      }
    } catch (error) {
      console.error("Error al obtener los enlaces:", error);
    } finally {
      setIsLoading(false); // Desactiva la pantalla de carga
    }
  };

  // Maneja el clic para abrir el modal de confirmación de eliminación
  const handleDeleteClick = (linkId) => {
    setLinkToDelete(linkId); // Almacena el ID del enlace a eliminar
    setShowDeleteModal(true); // Abre el modal de confirmación
  };

  // Función que elimina un enlace desde el backend
  const handleDelete = async () => {
    if (!linkToDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/links/${linkToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLinks(links.filter(link => link.LinkId !== linkToDelete)); // Filtra los enlaces para eliminar el seleccionado
        console.log(`Enlace con ID ${linkToDelete} eliminado correctamente`);
      } else {
        console.error(`Error al eliminar el enlace con ID ${linkToDelete}`);
      }
    } catch (error) {
      console.error(`Error al eliminar el enlace con ID ${linkToDelete}:`, error);
    }
    setShowDeleteModal(false); // Cierra el modal de confirmación
    setLinkToDelete(null); // Limpia el estado del enlace a eliminar
  };

  // Función para manejar el formulario de creación de un nuevo enlace
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Muestra la pantalla de carga mientras se envía el formulario
    const name = e.target.name.value;
    const url = e.target.url.value;
    const newLink = {
      LinkUrl: url,
      LinkName: name,
      ClickCount: 0,
      DailyViewCount: 0,
      MonthlyViewCount: 0,
      YearlyViewCount: 0,
      CreatedAt: new Date().toISOString(),
    };
    try {
      const response = await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink), // Envía los datos del nuevo enlace en formato JSON
      });
      if (response.ok) {
        await fetchLinks(); // Vuelve a obtener los enlaces para actualizar la lista
        setShowModal(false); // Cierra el modal de creación
      } else {
        console.error("Error al crear el enlace");
      }
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    } finally {
      setIsLoading(false); // Desactiva la pantalla de carga
    }
  };

  // Cálculos para el resumen de enlaces y paginación
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

  // Lógica de paginación
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para expandir o contraer las tarjetas móviles
  const toggleDetails = (id) => {
    setExpandedCard(expandedCard === id ? null : id); // Expande o colapsa la tarjeta seleccionada
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="dashboard"
    >
      {isLoading && <LoadingScreen />} // Muestra la pantalla de carga si isLoading es true

      {/* Resumen de enlaces */}
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

      {/* Si no hay enlaces, muestra el formulario de creación, si no, la tabla de administración */}
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

          {/* Tabla de enlaces */}
          <table className="link-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Link</th>
                <th>Clicks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLinks.map((link) => (
                <tr key={link.LinkId}>
                  <td>{link.LinkId}</td>
                  <td>{link.LinkUrl}</td>
                  <td>{link.ClickCount}</td>
                  <td className="actions">
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteClick(link.LinkId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(links.length / linksPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`pagination-button ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
