import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardReferrals.css";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";


const DashboardReferrals = () => {
  const navigate = useNavigate();
  useTokenValidation();

  const [referralLink, setReferralLink] = useState('https://example.com/ref/user123');
  const [referredUsers, setReferredUsers] = useState([
    { name: 'Alice Smith', date: '2023-05-01' },
    { name: 'Bob Johnson', date: '2023-05-15' },
    { name: 'Charlie Brown', date: '2023-05-30' },
  ]);
  const [earnings, setEarnings] = useState([
    { date: '2023-05-01', total: 50 },
    { date: '2023-05-15', total: 75 },
    { date: '2023-05-30', total: 100 },
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const url = "http://localhost:8000/users";

  return (
    <div className="dashboard">
      <div className="referral-container">
        <div className="referral-section">
          <h2>Referral Link</h2>
          <div className="referral-link">
            <input type="text" value={referralLink} readOnly />
            <button onClick={copyToClipboard}>Copy</button>
          </div>

          {/* carlos, obivmanete todo lo qu eestoy haciendo aca se puede cambiar
              solo estoy haciendo estos cambios para ir adelantando y probando los sistemas
              pongale los estilos como ud los quiera :p

              PD: el texto de abajo "Want to refer a friend? Paste their referral link here", 
              toca ajustarlo para el responsive, o buscar un texto mas corto, como ud quiera

              Despues de que ya exista un link de referido, este imput se tiene que deshabilitar
              y no dejar que jamas se vuelva a modificar, el usuario referido jamas puede ser 
              cambiado
          */}

          <h2>Want to refer a friend? Paste their referral link here</h2>
          <div className="referral-link">
            <input type="text" placeholder='Paste their referral link here' />
            <button>Refer</button>
          </div>
        </div>

        <div className="referral-data">
          <div className="referral-section">
            <h2>Referred Users</h2>
            <table className="referral-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {referredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="referral-section">
            <h2>Earnings Table</h2>
            <table className="referral-table">
              <thead>
                <tr>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.total}</td>
                    <td>{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReferrals;