import React from 'react';
import "../styles/stylesCommon/CreateLinkForm.css";

const CreateLinkForm = ({ onSubmit, isModal, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Asegúrate de que 'e' sea el evento del formulario
    const name = e.target.name.value;
    const url = e.target.url.value;
    const newLink = {
      LinkUrl: url,
      LinkName: name,
      ClickCount: 0,
      CreatedAt: new Date().toISOString(),
    };
    onSubmit(newLink); // Llama a la función onSubmit pasada como prop
  };

  return (
    <form onSubmit={handleSubmit} className={isModal ? '' : 'link-form'}>
      <div className="form-group">
        <label htmlFor="name">Link Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div className="form-group">
        <label htmlFor="url">Link URL</label>
        <input id="url" name="url" type="url" required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Create
        </button>
        {isModal && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateLinkForm;