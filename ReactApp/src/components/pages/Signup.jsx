import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/stylesUtils/TransitionBorder.css";
import "../styles/stylesUtils/withFadeInOnScroll.css";
import "../styles/stylesPages/Sign.css";

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

const Signup = ({ onRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (step === 1) {
      const isValid = await trigger(["name", "email"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["password", "passwordConfirm"]);
      if (isValid) {
        console.log(data);
        // Aquí simularemos un registro exitoso
        // En una aplicación real, aquí harías una llamada a tu API de registro
        setShowDialog(true);
      }
    }
  };

  const handleKeepSession = (keep) => {
    if (keep) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.setItem("isAuthenticated", "true");
    }
    setShowDialog(false);
    onRegister();
    navigate("/dashboardlinks");  // Cambiado de "/dashboard" a "/dashboardlinks"
  };

  return (
    <div className="Sing-usuario">
      <div className="GridArea animationFade">
        <div className="Welcome">
          <h2 className="Info-Title">Registro de Usuario</h2>
          <div className="Welcome-Text">
            Bienvenido al acortador de links TinyFy. Si ya tienes una
            cuenta, inicia sesión para continuar. Si no tienes una cuenta, crea
            una para comenzar.
          </div>
          {step === 1 && (
            <p className="Redirect-Text">
              ¿Ya tienes una cuenta?{" "}
              <Link className="Link-Forms transitionBorder" to="../Signin">
                Inicia sesión aquí
              </Link>
            </p>
          )}
        </div>
        <form className="Forms" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="Info-Title">Registrarse</h2>
          {step === 1 && (
            <>
              <FormGroup
                id="name"
                label="Nombre"
                register={register}
                rules={{ required: "El nombre es obligatorio" }}
                errors={errors}
              />
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
              <button className="Button-Forms" type="button" onClick={onSubmit}>
                Continuar
              </button>
            </>
          )}

          {step === 2 && (
            <>
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
              <FormGroup
                id="passwordConfirm"
                label="Confirmar Contraseña"
                type="password"
                register={register}
                rules={{
                  required: "La confirmación de la contraseña es obligatoria",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                }}
                errors={errors}
              />
              <button className="Button-Forms" type="submit">
                Registrar
              </button>
            </>
          )}
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

Signup.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Signup;