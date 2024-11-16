import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/stylesPages/DashboardPayouts.css";
import axios from "axios";
import useTokenValidation from "../hooks/useTokenValidation";

export default function DashboardPayouts() {
  const navigate = useNavigate();
  useTokenValidation();
  const token = localStorage.getItem("accessToken");

  const [paymentMethod, setPaymentMethod] = useState("paypal");
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
        // Tomamos el primer registro ya que el backend devuelve un array
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
      Method: paymentMethod,
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
        // Si existe PayoutDataId, actualizamos
        response = await axios.put(
          `${url}/${payoutData.PayoutDataId}`,
          newPayoutData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Si no existe, creamos nuevo
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

  // Manejador para el botón de editar/guardar
  const handleEditClick = async () => {
    if (editMode) {
      // Si estamos en modo edición, el formulario se enviará normalmente
      const form = document.querySelector(".payout-form");
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    } else {
      // Si no estamos en modo edición, solo cambiamos al modo edición
      setEditMode(true);
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

  useEffect(() => {
    if (payoutData) {
      setPaymentMethod(payoutData.Method || "paypal");
    }
  }, [payoutData]);

  const paymentHistory = [
    {
      id: "001",
      requestedAt: "2023-06-01",
      doneAt: "2023-06-03",
      amount: "$500",
    },
    {
      id: "002",
      requestedAt: "2023-06-15",
      doneAt: "2023-06-17",
      amount: "$750",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Payouts</h1>

        <div className="payment-options">
          <button
            className={`payment-option ${
              paymentMethod === "paypal" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("paypal")}
          >
            PayPal
          </button>
          <button
            className={`payment-option ${
              paymentMethod === "pse" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("pse")}
          >
            PSE
          </button>
        </div>

        <form className="payout-form" onSubmit={submitPayoutData}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paypalEmail">Paypal Email</label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.email || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.Name || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prefix">Prefix</label>
              <input
                type="text"
                id="prefix"
                name="prefix"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.phonePrefix || ""}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Please enter"
              disabled={!editMode}
              defaultValue={payoutData?.address || ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Please enter"
              disabled={!editMode}
              defaultValue={payoutData?.address2 || ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Please enter"
              disabled={!editMode}
              defaultValue={payoutData?.phoneNumber || ""}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.country || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.city || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Please enter"
                disabled={!editMode}
                defaultValue={payoutData?.zipcode || ""}
              />
            </div>
          </div>

          {paymentMethod === "pse" && (
            <div className="form-group">
              <label htmlFor="bank">Bank</label>
              <select
                id="bank"
                name="bank"
                disabled={!editMode}
                defaultValue={payoutData?.bank || ""}
              >
                <option value="">Select your bank</option>
                <option value="bancolombia">Bancolombia</option>
                <option value="davivienda">Davivienda</option>
                <option value="bbva">BBVA</option>
              </select>
            </div>
          )}

          <button
            type="button"
            className="edit-button"
            style={{ display: editMode ? "none" : "block" }}
            onClick={handleEditClick}
          >
            {editMode ? "Save Information" : "Edit Information"}
          </button>

          {editMode && (
            <button
              type="submit"
              className="edit-button"
              style={{ display: editMode ? "block" : "none" }}
            >
              Save Changes
            </button>
          )}
        </form>

        <div className="payment-history">
          <h2>Payment History</h2>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Requested At</th>
                <th>Done At</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.requestedAt}</td>
                  <td>{payment.doneAt}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
}
