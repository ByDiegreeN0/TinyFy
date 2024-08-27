import React, { useState } from 'react';
import "../styles/stylesPages/UserEditForm.css";
const UserEditForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    profilePicture: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser(prevUser => ({
        ...prevUser,
        profilePicture: file
      }));
      console.log('Archivo seleccionado:', file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario actualizado:', user);
    // Aquí irían las llamadas a la API para actualizar el usuario
  };

  return (
    <div className='container-user'>
      <div className="cardUser fade-in">
      <h2 className="title-user slide-in">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group slide-in">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            className='input-user'
            required
          />
        </div>
        <div className="input-group slide-in">
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            className='input-user'
            required
          />
        </div>
        <div className="input-group slide-in">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className='input-user'
            required
          />
        </div>
        <div className="input-group slide-in">
          <label htmlFor="profilePicture">Foto de perfil</label>
          <div className="file-input-wrapper">
            <button className="btn" type="button">Subir foto</button>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              className='input-user'
              accept="image/*"
            />
          </div>
        </div>
        <button type="submit" className="button-user slide-in">Actualizar Perfil</button>
      </form>
    </div>
    </div>
  );
};

export default UserEditForm;