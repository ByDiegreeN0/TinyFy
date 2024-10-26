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
  } = useForm();
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = watch("password");
  const navigate = useNavigate();

  const handleApiError = (error, type = 'register') => {
    setIsSubmitting(false);
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          if (data.field === 'email') {
            setError('email', {
              type: 'manual',
              message: 'Invalid email format'
            });
          } else if (data.field === 'password') {
            setError('password', {
              type: 'manual',
              message: 'Password does not meet requirements'
            });
          } else if (data.field === 'name') {
            setError('firstName', {
              type: 'manual',
              message: 'Invalid name format'
            });
          } else {
            setGeneralError('Please check your input data');
          }
          break;
        
        case 409:
          setError('email', {
            type: 'manual',
            message: 'This email is already registered'
          });
          break;
        
        case 429:
          setGeneralError('Too many attempts. Please try again later');
          break;
        
        case 500:
          setGeneralError('Server error. Please try again later');
          break;
        
        default:
          setGeneralError(type === 'register' 
            ? 'Registration failed. Please try again' 
            : 'Login failed. Please try again');
      }
    } else if (error.request) {
      setGeneralError('Network error. Please check your internet connection');
    } else {
      setGeneralError('An unexpected error occurred. Please try again');
    }
  };

  const validateStep1 = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email']);
    if (isValid) {
      const nameRegex = /^[a-zA-Z\s]{2,30}$/;
      if (!nameRegex.test(watch('firstName'))) {
        setError('firstName', {
          type: 'manual',
          message: 'Name must be 2-30 characters long and contain only letters'
        });
        return false;
      }
      if (!nameRegex.test(watch('lastName'))) {
        setError('lastName', {
          type: 'manual',
          message: 'Last name must be 2-30 characters long and contain only letters'
        });
        return false;
      }
    }
    return isValid;
  };

  const validateStep2 = async () => {
    const isValid = await trigger(['password', 'passwordConfirm']);
    if (isValid) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
      if (!passwordRegex.test(watch('password'))) {
        setError('password', {
          type: 'manual',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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
        if (isValid) setStep(2);
      } else if (step === 2) {
        const isValid = await validateStep2();
        if (isValid) {
          const registerResponse = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: `${data.firstName} ${data.lastName}`,
              email: data.email,
              password: data.password,
              RoleId: 1,
            }),
          });

          if (registerResponse.ok) {
            const loginResponse = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
            });

            if (loginResponse.ok) {
              const loginData = await loginResponse.json();
              localStorage.setItem('accessToken', loginData.access_token);
              
              const userId = getUserIdFromToken(loginData.access_token);
              if (userId) {
                localStorage.setItem('userId', userId);
              } else {
                console.warn('Could not obtain user ID from token');
              }
              setShowDialog(true);
            } else {
              const errorData = await loginResponse.json();
              setGeneralError(`Login error: ${errorData.msg}`);
            }
          } else {
            const errorData = await registerResponse.json();
            handleApiError({ response: { status: registerResponse.status, data: errorData } });
          }
        }
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeepSession = (keep) => {
    try {
      if (keep) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }
      setShowDialog(false);
      onRegister();
      navigate("/dashboardlinks");
    } catch (error) {
      setGeneralError("Failed to save session preferences");
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.identity || null;
    } catch (error) {
      console.error('Error decoding token:', error);
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
          {generalError && (
            <div className="Error-Message General-Error">{generalError}</div>
          )}
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
                    message: "Name must be at least 2 characters long"
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must not exceed 30 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Name can only contain letters"
                  }
                }}
                errors={errors}
              />
              <FormGroup
                id="lastName"
                label="Last name"
                register={register}
                rules={{ 
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters long"
                  },
                  maxLength: {
                    value: 30,
                    message: "Last name must not exceed 30 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Last name can only contain letters"
                  }
                }}
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
                    message: "Please enter a valid email address"
                  }
                }}
                errors={errors}
              />
              <button 
                className="Button-Forms" 
                type="button" 
                onClick={onSubmit}
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
                    message: "Password must be at least 6 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                  }
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
                    value === password || "Passwords do not match"
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
};

export default Signup;