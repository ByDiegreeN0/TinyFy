import React from "react";
import { Clock } from "lucide-react";
import { Modal } from "./Modal";
import "../styles/stylesCommon/SessionModal.css";

export function SessionModal({ isOpen, onClose, onConfirm }) {
  const handleKeepSession = () => {
    // Almacenar en localStorage para mantener la sesión después de cerrar el navegador
    localStorage.setItem("isAuthenticated", "true");
    onConfirm(true);
  };

  const handleDoNotKeep = () => {
    // Almacenar en sessionStorage para que se borre al cerrar el navegador
    sessionStorage.setItem("isAuthenticated", "true");
    onConfirm(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Session Status">
      <div className="session-content">
        <Clock className="session-icon" />
        <p className="session-message">
          Would you like to maintain your current session?
        </p>
        <div className="session-buttons">
          <button onClick={handleKeepSession} className="keep-session-button">
            Keep Session
          </button>
          <button onClick={handleDoNotKeep} className="end-session-button">
            Do Not Keep
          </button>
        </div>
      </div>
    </Modal>
  );
}