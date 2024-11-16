import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SuccessModal } from "../Common/SuccessModal";
import { SessionModal } from "../Common/SessionModal";
import axios from "axios";

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

const Signin = ({ onLogin, title, description, logoSrc }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [generalError, setGeneralError] = useState("");

  const handleApiError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      setLoginAttempts(prev => prev + 1);
      
      // Bloquear después de 5 intentos fallidos
      if (loginAttempts >= 4) {
        setIsLocked(true);
        const lockTime = 5 * 60; // 5 minutos en segundos
        setLockTimer(lockTime);
        setGeneralError(`Account temporarily locked. Please try again in ${Math.ceil(lockTime / 60)} minutes`);
        startLockdownTimer();
        return;
      }

      switch (status) {
        case 400:
          if (data.field === 'email') {
            setError('email', {
              type: 'manual',
              message: 'Invalid email format or not found'
            });
          } else if (data.field === 'password') {
            setError('password', {
              type: 'manual',
              message: 'Password must contain at least one number and one special character'
            });
          } else {
            setGeneralError('Please check your input data');
          }
          break;
        
        case 401:
          setError('password', {
            type: 'manual',
            message: `Incorrect password. ${5 - loginAttempts} attempts remaining`
          });
          break;
        
        case 403:
          if (data.reason === 'inactive') {
            setGeneralError('Account is inactive. Please check your email to activate your account');
          } else if (data.reason === 'suspended') {
            setGeneralError('Account has been suspended. Please contact support');
          } else {
            setGeneralError('Access denied. Please verify your credentials');
          }
          break;
        
        case 404:
          setError('email', {
            type: 'manual',
            message: 'No account found with this email address'
          });
          break;
        
        case 423:
          setGeneralError('Account locked due to suspicious activity. Please reset your password');
          break;
        
        case 429:
          setGeneralError('Too many login attempts. Please try again later');
          break;
        
        case 500:
          setGeneralError('Server error. Please try again later');
          break;
        
        case 503:
          setGeneralError('Service temporarily unavailable. Please try again in a few minutes');
          break;
        
        default:
          setGeneralError('An unexpected error occurred. Please try again');
      }
    } else if (error.request) {
      setGeneralError('Network error. Please check your internet connection');
    } else {
      setGeneralError('An unexpected error occurred. Please try again');
    }
  };

  const startLockdownTimer = () => {
    const timer = setInterval(() => {
      setLockTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(false);
          setLoginAttempts(0);
          setGeneralError("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (data) => {
    if (isLocked) {
      setGeneralError(`Account is locked. Please try again in ${Math.ceil(lockTimer / 60)} minutes`);
      return;
    }

    try {
      setGeneralError(""); // Clear any previous general errors
      
      const response = await axios.post('/api/login', data);
      const { access_token } = response.data;
      
      if (!access_token) {
        throw new Error('No access token received');
      }

      localStorage.setItem('accessToken', access_token);
      
      const userId = getUserIdFromToken(access_token);
      if (userId) {
        localStorage.setItem('userId', userId);
      } else {
        console.warn('Could not extract user ID from token');
      }
      
      // Mostrar el modal de éxito
      setShowSuccessModal(true);
      
      // Después de 2 segundos, cerrar el modal de éxito y mostrar el modal de sesión
      setTimeout(() => {
        setShowSuccessModal(false);
        setShowSessionModal(true);
      }, 1000);

    } catch (error) {
      handleApiError(error);
    }
  };

  const handleKeepSession = (keep) => {
    try {
      if (keep) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }
      setShowSessionModal(false);
      onLogin();
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
                message: "Please enter a valid email address",
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
          <button 
            className="Button-Forms" 
            type="submit"
            disabled={isLocked}
          >
            Sign In
          </button>
          
          {generalError && (
            <div className="General-Error-Container">
              <span className="Error-Message">{generalError}</span>
            </div>
          )}

          {isLocked && (
            <div className="Lock-Timer">
              Time remaining: {Math.floor(lockTimer / 60)}:{(lockTimer % 60).toString().padStart(2, '0')}
            </div>
          )}

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

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        title="Login Successful"
        message="Welcome back! You have successfully logged into your account."
      />

      {/* Session Modal */}
      <SessionModal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
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