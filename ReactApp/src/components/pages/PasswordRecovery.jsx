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
      await sendRecoveryCode(data.email);
      setEmail(data.email);
      setStep(2);
    } else {
      setError("email", {
        type: "manual",
        message: "This email is not registered.",
      });
    }
  };

  const onSubmitCode = async (data) => {
    // Simular verificación del código
    const isCodeValid = await verifyRecoveryCode(email, data.code);
    if (isCodeValid) {
      // Redirigir al usuario a Sign In
      navigate("/Signin", {
        state: { message: "Password reset successfully. Please log in." },
      });
    } else {
      setError("code", {
        type: "manual",
        message: "Invalid code. Please try again.",
      });
    }
  };

  const checkEmailExists = async (email) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  };

  const sendRecoveryCode = async (email) => {
    console.log(`Código de recuperación enviado a ${email}`);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const verifyRecoveryCode = async (email, code) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  };

  return (
    <div className="Sing-usuario">
      <div className="GridArea animationFade">
        <div className="Welcome">
          <h2 className="Info-Title">Account Recovery</h2>
          <div className="Welcome-Text">
            {step === 1
              ? "Forgot your password? Don't worry, we will help you regain access to your account. Enter your email to receive a recovery code."
              : "We have sent a recovery code to your email. Please check your inbox and enter the code below."}
          </div>
          <p className="Redirect-Text">
            Did you remember your password?{" "}
            <Link className="Link-Forms transitionBorder" to="../Signin">
              Log in here
            </Link>
          </p>
        </div>
        <form
          className="Forms"
          onSubmit={handleSubmit(step === 1 ? onSubmitEmail : onSubmitCode)}
        >
          <h2 className="Info-Title">
            {step === 1 ? "Recover Account" : "Verify Code"}
          </h2>
          {step === 1 ? (
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
          ) : (
            <FormGroup
              id="code"
              label="Recovery Code"
              register={register}
              rules={{
                required: "Recovery code is required",
                minLength: {
                  value: 6,
                  message: "The code must be at least 6 characters",
                },
              }}
              errors={errors}
            />
          )}
          <button className="Button-Forms" type="submit">
            {step === 1 ? "Send Code" : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
