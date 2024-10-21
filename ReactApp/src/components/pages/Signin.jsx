import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/stylesPages/Sign.css";
import "../styles/stylesUtils/TransitionBorder.css";
import "../styles/stylesUtils/withFadeInOnScroll.css";

// Componente para renderizar un grupo de formulario con etiqueta y entrada.
const FormGroup = ({ id, label, type = "text", register, rules, errors }) => (
  <div className="Form-Group">
    <label className="Label-Forms" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`Input-Forms ${errors[id] ? "error" : ""}`} // Añade clase de error si hay un error.
      {...register(id, rules)} // Registra el campo en el formulario con las reglas de validación.
    />
    <div className="Error-Container">
      {errors[id] && (
        <span className="Error-Message">{errors[id].message}</span> // Muestra mensaje de error si existe.
      )}
    </div>
  </div>
);

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Componente para mostrar un diálogo modal para la confirmación de sesión.
const CustomDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // No renderiza nada si el diálogo no está abierto.

  return (
    <div className="Dialog-Overlay">
      <div className="Dialog-Content">
        <h2>Keep session</h2>
        <p>Do you want to stay logged in?</p>
        <div className="Dialog-Actions">
          <button className="Button-Forms" onClick={() => onConfirm(true)}>
            Yes
          </button>
          <button className="Button-Forms" onClick={() => onConfirm(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal de inicio de sesión.
const Signin = ({ onLogin, title, description, logoSrc }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token);
      
      // Intentamos obtener el user_id del token
      const userId = getUserIdFromToken(access_token);
      if (userId) {
        localStorage.setItem('userId', userId);
      } else {
        console.warn('No se pudo obtener el ID del usuario del token');
      }
      
      setShowDialog(true);
    } catch (error) {
      console.error(error);
      setLoginError("Login failed: " + (error.response ? error.response.data.msg : "Network error"));
    }
  };

  const handleKeepSession = (keep) => {
    if (keep) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.setItem("isAuthenticated", "true");
    }
    setShowDialog(false);
    onLogin();
    navigate("/dashboardlinks");
  };

  // Función para intentar obtener el ID del usuario del token
  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.identity || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  return (
    <div className="Sing-usuario animationFade">
      <div className="GridArea">
        <div
          className="Welcome"
          title={title}
          description={description}
          logoSrc={logoSrc}
        >
          <h1 className="Info-Title">Welcome</h1>
          <p className="Welcome-Text">
            Welcome to the link shortener{title}. If you already have one
            account, log in to continue. If you don't have an account, create
            one to start.
          </p>
          <Link className="Redirect-Text" to="../Signup">
            Don't have an account?{" "}
            <span className="Link-Forms transitionBorder">Sign up</span>
          </Link>{" "}
          <br /> <br />
          <Link className="Redirect-Text" to="../PasswordRecovery">
            Forgot your password?{" "}
            <span className="Link-Forms transitionBorder">Restore</span>
          </Link>
        </div>
        <form className="Forms" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="Info-Title">Sign In</h2>
          <FormGroup
            id="email"
            label="Email"
            type="email"
            register={register}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@.]{2,}$/,
                message: "The email is not valid",
              },
            }}
            errors={errors}
          />
          <FormGroup
            id="password"
            label="Password"
            type="password"
            register={register}
            rules={{
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 6 characters",
              },
            }}
            errors={errors}
          />
          <button className="Button-Forms" type="submit">
            Sign In
          </button>

          <div className="Welcome-responsive">
            <div className="welcome-links-container">
              <Link className="Redirect-Text" to="../Signup">
                Don't have an account?{" "}
                <span className="Link-Forms transitionBorder">Sign up</span>
              </Link>{" "}
              <br /> <br />
              <Link className="Redirect-Text" to="../PasswordRecovery">
                Forgot your password?{" "}
                <span className="Link-Forms transitionBorder">Restore</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <CustomDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleKeepSession}
      />
    </div>
  );
};

Signin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

export default Signin;
