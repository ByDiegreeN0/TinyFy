
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardSupport.css";
import axios from "axios";
import useTokenValidation from "../hooks/useTokenValidation";

import perroSoporte from '../../assets/Img/PerroSoporte.webp'; // imagen del perro
import userIMG from '../../assets/Img/Avataruser.jpg' // imagen del user

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // importaciones de fontawesome
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // importaciones de fontawesome
import { faUserShield } from '@fortawesome/free-solid-svg-icons'; // Icono de administrador


const DashboardSupport = () => {
  const navigate = useNavigate();
  useTokenValidation();
  const token = localStorage.getItem("accessToken");

  const [supportMethod, setSupportMethod] = useState("form");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payoutData, setPayoutData] = useState(null);
  const url = "http://localhost:8000/payout_data";

  // Función para obtener los datos de payout (GET)
  const fetchPayoutData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        setPayoutData(response.data[0]);
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.status === 401) {
        navigate("/Signin");
      }
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") ||
      sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/Signin");
    } else {
      fetchPayoutData();
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Support</h1>

        <div className="payment-options">
          <button
            className={`payment-option ${supportMethod === "form" ? "active" : ""}`}
            onClick={() => setSupportMethod("form")}
          >
            Support Form
          </button>
          <button
            className={`payment-option ${supportMethod === "chat" ? "active" : ""}`}
            onClick={() => setSupportMethod("chat")}
          >
            Online Chat
          </button>
        </div>

        <div className="support-container" style={{ display: supportMethod === "form" ? "flex" : "none" }}>
          <form action="https://formsubmit.co/tinyfys@gmail.com" method="POST" className="support-form">
            <div className="form-group">
              <label htmlFor="address">User Email</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.email || ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Please enter"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="textarea" name="message" placeholder="What do you want to ask to the Tinify´s support?" />
            </div>

            <button
              type="button"
              className="edit-button"
              style={{ display: editMode ? "none" : "block" }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Save Information" : "Send Email"}
            </button>

            {editMode && (
              <button type="submit" className="edit-button">
                Are you sure? (click to send)
              </button>
            )}
          </form>

          <div className="support-img">
            <img src={perroSoporte} alt="Support" />
          </div>
        </div>

        {supportMethod === "chat" && (
          <div className="chat-container">
            <div className="chat-card">
              <div className="chat-img">
                <FontAwesomeIcon icon={faUserShield} />
              </div>

              <div className="chat-content">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit provident dolore blanditiis ipsam iusto inventore error libero voluptatum est, praesentium sed mollitia doloremque placeat nesciunt. Saepe natus sequi fugiat voluptas?</p>
              </div>
            </div>

            <div className="chat-card">

              <div className="chat-content">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit provident dolore blanditiis ipsam iusto inventore error libero voluptatum est, praesentium sed mollitia doloremque placeat nesciunt. Saepe natus sequi fugiat voluptas?</p>
              </div>

              <div className="chat-img">
                <img src={userIMG} alt="" />
              </div>
            </div>


            <div className="chat-bottom">
              <form action="">
                <input className="chat-input" type="text" placeholder="Write a message..." />
                <button className="chat-send" type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>

            </div>
          </div>
        )}
      </div>

      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default DashboardSupport;
