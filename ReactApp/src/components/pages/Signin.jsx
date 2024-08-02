import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/stylesPages/Sign.css";
import "../styles/stylesUtils/TransitionBorder.css";
import "../styles/stylesUtils/withFadeInOnScroll.css";

const FormGroup = ({ id, label, type = "text", register, rules, errors }) => (
  <div className="Form-Group">
    <label className="Label-Forms" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`Input-Forms ${errors[id] ? "error" : ""}`}
      {...register(id, rules)}
    />
    <div className="Error-Container">
      {errors[id] && (
        <span className="Error-Message">{errors[id].message}</span>
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

const CustomDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="Dialog-Overlay">
      <div className="Dialog-Content">
        <h2>Mantener sesión</h2>
        <p>¿Desea mantener la sesión iniciada?</p>
        <div className="Dialog-Actions">
          <button className="Button-Forms" onClick={() => onConfirm(true)}>Sí</button>
          <button className="Button-Forms" onClick={() => onConfirm(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

const Signin = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // En una aplicación real, aquí harías una llamada a tu API de autenticación
    setShowDialog(true);
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

  return (
    <div className="Sing-usuario animationFade">
      <div className="GridArea">
        <div className="Welcome">
          <h1 className="Info-Title">Bienvenido</h1>
          <p className="Welcome-Text">
            Bienvenidos al acortador de links CarlitosApp. Si ya tienes una
            cuenta, inicia sesión para continuar. Si no tienes una cuenta, crea
            una para comenzar.
          </p>
          <Link className="Redirect-Text" to="../Signup">
            ¿No tienes cuenta?{" "}
            <span className="Link-Forms transitionBorder">Regístrate</span>
          </Link>
        </div>
        <form className="Form-Login" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="Info-Title">Inicio de Sesión</h2>
          <FormGroup
            id="email"
            label="Correo Electrónico"
            type="email"
            register={register}
            rules={{
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@.]{2,}$/,
                message: "El correo electrónico no es válido",
              },
            }}
            errors={errors}
          />
          <FormGroup
            id="password"
            label="Contraseña"
            type="password"
            register={register}
            rules={{
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            }}
            errors={errors}
          />
          <button className="Button-Forms" type="submit">
            Iniciar Sesión
          </button>
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
};

export default Signin;