import React, { useState } from 'react';
import './Register.css';

// Componente funcional Register
const Register = () => {
  // Definiendo el estado inicial para el formulario
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  // Definiendo el estado para el mensaje de error
  const [error, setError] = useState('');

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que las contraseñas coinciden
    if (form.password !== form.confirm_password) {
      setError('<h1 className="error_message">Las contraseñas no coinciden</h1>');
      return;
    }

    try {
      // Enviar datos del formulario a la API
      const response = await fetch('https://example.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      // Obtener respuesta de la API
      const data = await response.json();
      console.log('Success:', data);
      // Limpiar el mensaje de error en caso de éxito
      setError('');
    } catch (error) {
      // Manejar errores en la solicitud
      console.error('Error:', error);
    }
  };

  return (
    <div className='register_container'>
      {/* Formulario de registro */}
      <form onSubmit={handleSubmit} className='register_form'>
        <h1 className='title'>Register</h1>
        {/* Campo de usuario */}
        <div className='form_group'>
          <label className='form_label' htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            required
            id="username"
            name="username"
            className='form_input'
            value={form.username}
            onChange={handleChange}
          />
        </div>
        {/* Campo de correo electrónico */}
        <div className='form_group'>
          <label className='form_label' htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            name="email"
            className='form_input'
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {/* Campo de contraseña */}
        <div className='form_group'>
          <label className='form_label' htmlFor="password">Contraseña</label>
          <input
            type="password"
            required
            id="password"
            name="password"
            className='form_input'
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {/* Campo de confirmación de contraseña */}
        <div className='form_group'>
          <label className='form_label' htmlFor="confirm_password">Confirmar contraseña</label>
          <input
            type="password"
            required
            id="confirm_password"
            name="confirm_password"
            className='form_input'
            value={form.confirm_password}
            onChange={handleChange}
          />
        </div>
        {/* Mostrar mensaje de error si las contraseñas no coinciden */}
        {error && <div className='error_message'>{error}</div>}
        {/* Botón de registro */}
        <button className='btn btn_primary' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
