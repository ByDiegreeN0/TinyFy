import React from 'react';
import { X } from 'lucide-react';
import '../styles/stylesCommon/Modal.css';

export function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="close-button">
            <X className="close-icon" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}