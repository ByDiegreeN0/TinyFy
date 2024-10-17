import React from 'react';
import "../styles/stylesCommon/DeleteLinkModal.css";

const DeleteLinkModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm deletion</h2>
        <p>Are you sure you want to remove this link?</p>
        <div className="form-actions">
          <button onClick={onConfirm} className="btn-delete">
            Delete
          </button>
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLinkModal;