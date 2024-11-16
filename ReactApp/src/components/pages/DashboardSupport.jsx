import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardSupport.css";
import axios from "axios";
import useTokenValidation from "../hooks/useTokenValidation";
import perroSoporte from '../../assets/Img/PerroSoporte.webp';

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

  // Función para crear o actualizar los datos del payout
  const submitPayoutData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newPayoutData = {
      Name: e.target.fullName.value,
      email: e.target.paypalEmail.value,
      Method: supportMethod, // Se usa supportMethod o define otra variable de estado para el método de pago si es necesario
      country: e.target.country.value,
      city: e.target.city.value,
      zipcode: e.target.zipCode.value,
      address: e.target.address.value,
      address2: e.target.address2?.value || "",
      phonePrefix: e.target.prefix.value,
      phoneNumber: e.target.phoneNumber.value,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };

    try {
      let response;
      if (payoutData?.PayoutDataId) {
        response = await axios.put(`${url}/${payoutData.PayoutDataId}`, newPayoutData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post(url, newPayoutData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 201 || response.status === 200) {
        console.log("Payout data saved successfully");
        setEditMode(false);
        fetchPayoutData();
      }
    } catch (error) {
      console.error("Error:", error);
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
          <form className="support-form" onSubmit={submitPayoutData}>
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
              {editMode ? "Save Information" : "Send Message"}
            </button>

            {editMode && (
              <button type="submit" className="edit-button">
                Submit Payout
              </button>
            )}
          </form>

          <div className="support-img">
            <img src={perroSoporte} alt="Support" />
          </div>
        </div>

        {supportMethod === "chat" && (
          <div className="chat-container">
            <h1>test</h1>
         
          </div>
        )}
      </div>

      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default DashboardSupport;
