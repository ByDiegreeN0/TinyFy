import React, { useState } from 'react';
import "../styles/stylesPages/UserEditForm.css";

const UserEditForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    profilePicture: null
  });

  const [previewUrl, setPreviewUrl] = useState(null);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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
        <div className="profile-section">
          <div className="profile-picture-container">
            <img 
              src={previewUrl || '/path/to/default/avatar.jpg'} 
              alt="Profile" 
              className="profile-picture"
            />
            <div className="profile-picture-overlay">
              <span>Edit profile photo</span>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="form-section">
          <h2 className="title-user slide-in">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group slide-in">
              <label htmlFor="firstName">First Name</label>
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
              <label htmlFor="lastName">Last Name</label>
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
              <label htmlFor="username">Username</label>
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
            <button type="submit" className="button-user slide-in">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;