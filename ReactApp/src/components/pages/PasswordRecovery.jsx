import React, { useState } from "react";
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

const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmitEmail = async (data) => {
    // Simular verificación de correo en la base de datos
    const isRegistered = await checkEmailExists(data.email);
    if (isRegistered) {
      // Simular envío de código de recuperación
      await sendRecoveryCode(data.email);
      setEmail(data.email);
      setStep(2);
    } else {
      setError("email", {
        type: "manual",
        message: "Este correo electrónico no está registrado.",
      });
    }
  };

  const onSubmitCode = async (data) => {
    // Simular verificación del código
    const isCodeValid = await verifyRecoveryCode(email, data.code);
    if (isCodeValid) {
      // Redirigir al usuario a Sign In
      navigate("/Signin", { state: { message: "Contraseña restablecida con éxito. Por favor, inicia sesión." } });
    } else {
      setError("code", {
        type: "manual",
        message: "Código inválido. Por favor, intenta de nuevo.",
      });
    }
  };

  // Funciones simuladas para operaciones del backend
  const checkEmailExists = async (email) => {
    // Simular verificación en la base de datos
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  };

  const sendRecoveryCode = async (email) => {
    // Simular envío de correo con código
    console.log(`Código de recuperación enviado a ${email}`);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const verifyRecoveryCode = async (email, code) => {
    // Simular verificación del código
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  };

  return (
    <div className="Sing-usuario">
      <div className="GridArea animationFade">
        <div className="Welcome">
          <h2 className="Info-Title">Recuperación de Cuenta</h2>
          <div className="Welcome-Text">
            {step === 1
              ? "¿Olvidaste tu contraseña? No te preocupes, te ayudaremos a recuperar el acceso a tu cuenta. Ingresa tu correo electrónico para recibir un código de recuperación."
              : "Hemos enviado un código de recuperación a tu correo electrónico. Por favor, revisa tu bandeja de entrada e ingresa el código a continuación."}
          </div>
          <p className="Redirect-Text">
            ¿Recordaste tu contraseña?{" "}
            <Link className="Link-Forms transitionBorder" to="../Signin">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <form className="Forms" onSubmit={handleSubmit(step === 1 ? onSubmitEmail : onSubmitCode)}>
          <h2 className="Info-Title">{step === 1 ? "Recuperar Cuenta" : "Verificar Código"}</h2>
          {step === 1 ? (
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
          ) : (
            <FormGroup
              id="code"
              label="Código de Recuperación"
              register={register}
              rules={{
                required: "El código de recuperación es obligatorio",
                minLength: {
                  value: 6,
                  message: "El código debe tener al menos 6 caracteres",
                },
              }}
              errors={errors}
            />
          )}
          <button className="Button-Forms" type="submit">
            {step === 1 ? "Enviar Código" : "Verificar Código"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;