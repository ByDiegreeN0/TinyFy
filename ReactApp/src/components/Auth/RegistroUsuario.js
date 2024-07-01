import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Registro_Usuario.css";

const RegistroUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const [step, setStep] = useState(1);
  const [hasMoreLinks, setHasMoreLinks] = useState(true);
  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    if (step === 1) {
      const isValid = await trigger(["name", "email"]);
      if (isValid) {
        setStep((prevStep) => prevStep + 1);
      }
    }
    if (step === 2) {
      const isValid = await trigger(["password", "passwordConfirm"]);
      if (isValid) {
        handleSubmit(onSubmit)();
        setHasMoreLinks(false);
      }
    }
  };

  return (
    <div className="Registro-usuario">
      <div className="GridArea">
        <div className="Welcome">
          <h2 className="Info-Title">Registro de Usuario</h2>
          <div className="Welcome-Text">
            Bienvenido al acortador de links CarlitosApp
            Si ya tienes una cuenta, inicia sesión para continuar.
            Si no tienes una cuenta, crea una para comenzar.
          </div>
          {step === 1 && (
            <p className="Redirect-Text">
              ¿Ya tienes una cuenta?{" "}
              <a className="Link-Forms" href="/login">
                Inicia sesión aquí
              </a>
            </p>
          )}
        </div>
        <form className="Form-Registro" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="Info-Title">Registrarse</h2>
          {step === 1 && (
            <>
              <div className="Form-Group">
                <label className="Label-Forms" htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  className={`Input-Forms ${errors.name ? "error" : ""}`}
                  {...register("name", { required: "El nombre es obligatorio" })}
                />
                <div className="Error-Container">
                  {errors.name && <span className="Error-Message">{errors.name.message}</span>}
                </div>
              </div>

              <div className="Form-Group">
                <label className="Label-Forms" htmlFor="email">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className={`Input-Forms ${errors.email ? "error" : ""}`}
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@.]{2,}$/,
                      message: "El correo electrónico no es válido",
                    },
                  })}
                />
                <div className="Error-Container">
                  {errors.email && <span className="Error-Message">{errors.email.message}</span>}
                </div>
              </div>

              <button
                className="Button-Forms"
                type={hasMoreLinks ? "button" : "submit"}
                onClick={onSubmit}
              >
                {hasMoreLinks ? "Continuar" : "Enviar"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="Form-Group">
                <label className="Label-Forms" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className={`Input-Forms ${errors.password ? "error" : ""}`}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <div className="Error-Container">
                  {errors.password && <span className="Error-Message">{errors.password.message}</span>}
                </div>
              </div>

              <div className="Form-Group">
                <label className="Label-Forms" htmlFor="passwordConfirm">
                  Confirmar Contraseña
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  className={`Input-Forms ${errors.passwordConfirm ? "error" : ""}`}
                  {...register("passwordConfirm", {
                    required: "La confirmación de la contraseña es obligatoria",
                    validate: (value) => value === password || "Las contraseñas no coinciden",
                  })}
                />
                <div className="Error-Container">
                  {errors.passwordConfirm && (
                    <span className="Error-Message">{errors.passwordConfirm.message}</span>
                  )}
                </div>
              </div>

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

export default RegistroUsuario;