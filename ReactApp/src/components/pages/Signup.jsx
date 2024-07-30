import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../utils/stylesUtils/TransitionBorder.css";
import "../../utils/stylesUtils/withFadeInOnScroll.css";
import "../styles/Sign.css";

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

const Signup = ({ onRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const [step, setStep] = useState(1);
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
        const keepSession = window.confirm('¿Desea mantener la sesión iniciada?');
        if (keepSession) {
          localStorage.setItem('isAuthenticated', 'true');
        } else {
          sessionStorage.setItem('isAuthenticated', 'true');
        }
        onRegister();
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="Sing-usuario">
      <div className="GridArea animationFade">
        <div className="Welcome">
          <h2 className="Info-Title">Registro de Usuario</h2>
          <div className="Welcome-Text">
            Bienvenido al acortador de links CarlitosApp. Si ya tienes una
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
        <form className="Form-Registro" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

Signup.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Signup;