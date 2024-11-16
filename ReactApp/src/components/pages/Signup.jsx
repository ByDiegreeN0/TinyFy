import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SuccessModal } from "../Common/SuccessModal";
import { SessionModal } from "../Common/SessionModal";
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

CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

const Signup = ({ onRegister, title, description }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setError,
    clearErrors,
    getValues,
    reset,
  } = useForm();

  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const password = watch("password");
  const navigate = useNavigate();

  // Verificar email existente
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleApiError = (error) => {
    setIsSubmitting(false);
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          if (data.field === "email") {
            setError("email", {
              type: "manual",
              message: "Invalid email format",
            });
          } else if (data.field === "password") {
            setError("password", {
              type: "manual",
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            });
          } else if (data.field === "name") {
            setError("firstName", {
              type: "manual",
              message: "Invalid name format",
            });
          } else {
            setGeneralError("Please check your input data");
          }
          break;

        case 409:
          setError("email", {
            type: "manual",
            message: "This email is already registered",
          });
          break;

        case 429:
          setGeneralError("Too many attempts. Please try again later");
          break;

        case 500:
          setGeneralError("Server error. Please try again later");
          break;

        case 503:
          setGeneralError(
            "Service temporarily unavailable. Please try again in a few minutes"
          );
          break;

        default:
          setGeneralError("An unexpected error occurred. Please try again");
      }
    } else if (error.request) {
      setGeneralError("Network error. Please check your internet connection");
    } else {
      setGeneralError("An unexpected error occurred. Please try again");
    }
  };

  const validateStep1 = async () => {
    const isValid = await trigger(["firstName", "lastName", "email"]);
    if (isValid) {
      // Verificar email antes de continuar
      const emailExists = await checkEmailExists(watch("email"));
      if (emailExists) {
        return false;
      }

      const nameRegex = /^[a-zA-Z\s]{2,30}$/;
      if (!nameRegex.test(watch("firstName"))) {
        setError("firstName", {
          type: "manual",
          message: "Name must be 2-30 characters long and contain only letters",
        });
        return false;
      }
      if (!nameRegex.test(watch("lastName"))) {
        setError("lastName", {
          type: "manual",
          message:
            "Last name must be 2-30 characters long and contain only letters",
        });
        return false;
      }
    }
    return isValid;
  };

  const validateStep2 = async () => {
    const isValid = await trigger(["password", "passwordConfirm"]);
    if (isValid) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
      if (!passwordRegex.test(watch("password"))) {
        setError("password", {
          type: "manual",
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        });
        return false;
      }
    }
    return isValid;
  };

  const onSubmit = async (data) => {
    try {
      clearErrors();
      setGeneralError("");
      setIsSubmitting(true);

      if (step === 1) {
        const isValid = await validateStep1();
        if (isValid) {
          setFormData({ ...formData, ...data });
          setStep(2);
        }
      } else if (step === 2) {
        const isValid = await validateStep2();
        if (isValid) {
          const registerResponse = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              password: data.password,
              RoleId: 1,
            }),
          });

          if (!registerResponse.ok) {
            const errorData = await registerResponse.json();
            throw {
              response: { status: registerResponse.status, data: errorData },
            };
          }

          // Registro exitoso, intentar login automático
          const loginResponse = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: data.password,
            }),
          });

          if (!loginResponse.ok) {
            throw new Error("Login failed after registration");
          }

          const loginData = await loginResponse.json();
          localStorage.setItem("accessToken", loginData.access_token);

          // Mostrar modal de éxito
          setShowSuccessModal(true);

          // Después de 2 segundos, cerrar modal de éxito y mostrar modal de sesión
          setTimeout(() => {
            setShowSuccessModal(false);
            setShowSessionModal(true);
          }, 2000);
        }
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    clearErrors();
    setGeneralError("");
  };

  const handleKeepSession = (keep) => {
    try {
      if (keep) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }
      setShowSessionModal(false);
      onRegister();
      navigate("/dashboardlinks");
    } catch (error) {
      setGeneralError("Failed to save session preferences");
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.identity || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
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
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must not exceed 30 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Name can only contain letters",
                  },
                }}
                errors={errors}
              />
              {errors.firstName && (
                <div className="Error-Message">{errors.firstName.message}</div>
              )}

              <FormGroup
                id="lastName"
                label="Last name"
                register={register}
                rules={{
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "Last name must not exceed 30 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Last name can only contain letters",
                  },
                }}
                errors={errors}
              />
              {errors.lastName && (
                <div className="Error-Message">{errors.lastName.message}</div>
              )}

              <FormGroup
                id="email"
                label="Email"
                type="email"
                register={register}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@.]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                }}
                errors={errors}
              />
              {errors.email && (
                <div className="Error-Message">{errors.email.message}</div>
              )}

              <button
                className="Button-Forms"
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Continue"}
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
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
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
                  required: "Password confirmation is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                errors={errors}
              />

              

              <button
                className="Button-Forms"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Register"}
              </button>

              <button
                className="Back-Button"
                type="button"
                onClick={handleBack}
              >
                Back to Previous Step
              </button>
              {generalError && (
                <div className="Error-Message General-Error">
                  {generalError}
                </div>
              )}
            </>
          )}
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        title="Registration Successful"
        message="Your account has been created successfully!"
      />

      {/* Session Modal */}
      <SessionModal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        onConfirm={handleKeepSession}
      />
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
};

export default Signup;
