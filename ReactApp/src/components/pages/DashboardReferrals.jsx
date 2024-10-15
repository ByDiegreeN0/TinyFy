import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardReferrals.css"

const DashboardReferrals = () => {

  const token = localStorage.getItem('accessToken');// token de authorization

  if (!token) {
    console.error("No token found");
    navigate("/Signin");
  }
  


  const navigate = useNavigate();
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

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') || sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="dashboard">
      <div className="referral-container">
        <div className="referral-section">
          <h2>Referral Link</h2>
          <div className="referral-link">
            <input type="text" value={referralLink} readOnly />
            <button onClick={copyToClipboard}>Copy</button>
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