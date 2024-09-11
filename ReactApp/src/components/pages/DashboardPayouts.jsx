import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/stylesPages/DashboardPayouts.css";

export default function DashboardPayouts() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") ||
      sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/Signin");
    }
  }, [navigate]);

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
    // Add more payment history items as needed
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
        <form className="payout-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paypalEmail">Paypal Email</label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                placeholder="Please enter"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Names</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Please enter"
                disabled={!editMode}
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Please enter"
              disabled={!editMode}
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
              />
            </div>
          </div>
          {paymentMethod === "pse" && (
            <div className="form-group">
              <label htmlFor="bank">Bank</label>
              <select id="bank" name="bank" disabled={!editMode}>
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
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Save Information" : "Edit Information"}
          </button>
        </form>
        <div className="payment-history">
          <h2>Payment History</h2>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Payment Requested at</th>
                <th>Payment Done at</th>
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
    </div>
  );
}
