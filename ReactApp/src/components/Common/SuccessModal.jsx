import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Modal } from './Modal';
import '../styles/stylesCommon/SuccessModal.css';

export function SuccessModal({ isOpen, onClose, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="success-content">
        <CheckCircle className="success-icon" />
        <p className="success-message">{message}</p>
      </div>
    </Modal>
  );
}