import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/stylesPages/Sign.css";
import "../styles/stylesUtils/TransitionBorder.css";
import "../styles/stylesUtils/withFadeInOnScroll.css";

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

const Signin = ({ onLogin, title, description, logoSrc }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setShowDialog(true);
  };

  const handleKeepSession = (keep) => {
    if (keep) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.setItem("isAuthenticated", "true");
    }
    setShowDialog(false);
    onLogin();
    navigate("/dashboardlinks");
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
                message: "The email is not valid",
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
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            errors={errors}
          />
          <button className="Button-Forms" type="submit">
            Sign In
          </button>
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

Signin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

export default Signin;
