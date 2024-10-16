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
  } = useForm();
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (step === 1) {
      const isValid = await trigger(["firstName", "lastName", "email"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["password", "passwordConfirm"]);
      if (isValid) {
        try {
          // Register the user
          const registerResponse = await fetch('http://localhost:8000/users', {
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
            console.log('User registered successfully');
            
            // Now, login to get the access token
            const loginResponse = await fetch('http://localhost:8000/login', {
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
              setShowDialog(true);
            } else {
              const errorData = await loginResponse.json();
              console.error('Login failed:', errorData.msg);
              alert("Login failed: " + errorData.msg);
            }
          } else {
            const errorData = await registerResponse.json();
            console.error('Registration failed:', errorData.message);
            alert("Registration failed: " + errorData.message);
          }
        } catch (error) {
          console.error('Error during registration or login:', error);
          alert('Error during registration or login: Network error');
        }
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
    navigate("/dashboardlinks");
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
                Continue
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
                Register
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