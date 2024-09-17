import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/stylesUtils/TransitionBorder.css";
import "../styles/stylesUtils/withFadeInOnScroll.css";
import "../styles/stylesPages/Sign.css";

// Componente para renderizar un grupo de formulario con etiqueta y entrada.
const FormGroup = ({ id, label, type = "text", register, rules, errors }) => (
  <div className="Form-Group">
    <label className="Label-Forms" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`Input-Forms ${errors[id] ? "error" : ""}`} // Aplica clase de error si hay errores.
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
            Sí
          </button>
          <button className="Button-Forms" onClick={() => onConfirm(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

// Componente principal de registro.
const Signup = ({ onRegister, title, description }) => {
  // Hook para manejar el formulario y su estado.
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const [step, setStep] = useState(1); // Estado para rastrear el paso actual del formulario.
  const [showDialog, setShowDialog] = useState(false); // Estado para controlar la visibilidad del diálogo de confirmación.
  const password = watch("password"); // Observa el campo de contraseña para la validación de confirmación.
  const navigate = useNavigate(); // Hook para navegación programática.

  // Maneja el envío del formulario.
  const onSubmit = async (data) => {
    if (step === 1) {
      const isValid = await trigger(["firstName", "lastName", "email"]); // Valida los campos del primer paso.
      if (isValid) setStep(2); // Avanza al siguiente paso si los campos son válidos.
    } else if (step === 2) {
      const isValid = await trigger(["password", "passwordConfirm"]); // Valida los campos del segundo paso.
      if (isValid) {
        console.log(data); // Imprime los datos del formulario en la consola.
        // Simulación de un registro exitoso.
        setShowDialog(true); // Muestra el diálogo de confirmación.
      }
    }
  };

  // Maneja la decisión del usuario en el diálogo de confirmación de sesión.
  const handleKeepSession = (keep) => {
    if (keep) {
      localStorage.setItem("isAuthenticated", "true"); // Guarda la sesión en el almacenamiento local si se confirma.
    } else {
      sessionStorage.setItem("isAuthenticated", "true"); // Guarda la sesión en el almacenamiento de sesión si se niega.
    }
    setShowDialog(false); // Cierra el diálogo.
    onRegister(); // Llama a la función de registro pasada como prop.
    navigate("/dashboardlinks"); // Navega a la página de enlaces del panel de control.
  };

  return (
    <div className="Sing-usuario">
      <div className="GridArea animationFade">
        <div className="Welcome">
          <h2 className="Info-Title">Sign Up in TinyFy</h2>
          <div className="Welcome-Text">
            If you already have an account, log in to continue. If you don't
            have an account, create one to get started.
          </div>
          {(step === 1 || step === 2) && (
            <p className="Redirect-Text">
              Do you already have an account?{" "}
              <Link className="Link-Forms transitionBorder" to="../Signin">
                Sign In here
              </Link>
            </p>
          )}
        </div>
        <form className="Forms" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="Info-Title">Sign Up</h2>
          {step === 1 && (
            <>
              <FormGroup
                id="firstName"
                label="Name"
                register={register}
                rules={{ required: "The name is required" }}
                errors={errors}
              />
              <FormGroup
                id="lastName"
                label="Last name"
                register={register}
                rules={{ required: "Last name is required" }}
                errors={errors}
              />
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
              <button className="Button-Forms" type="button" onClick={onSubmit}>
                Continuar
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <FormGroup
                id="password"
                label="Password"
                type="password"
                register={register}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                errors={errors}
              />
              <FormGroup
                id="passwordConfirm"
                label="Confirm Password"
                type="password"
                register={register}
                rules={{
                  required: "Password confirmation is mandatory",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                errors={errors}
              />
              <button className="Button-Forms" type="submit">
                Registrar
              </button>
            </>
          )}

          <div className="Welcome-responsive">
            {(step === 1 || step === 2) && (
              <p className="Redirect-Text">
                Do you already have an account?{" "}
                <Link className="Link-Forms transitionBorder" to="../Signin">
                  Sign In here
                </Link>
              </p>
            )}
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

Signup.propTypes = {
  onRegister: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

export default Signup;
