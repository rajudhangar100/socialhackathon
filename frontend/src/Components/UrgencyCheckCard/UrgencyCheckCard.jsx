import React from 'react';
import './UrgencyCheckCard.css';
import { useNavigate } from 'react-router-dom';

const UrgencyCheckCard = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/analysis');
  };

  return (
    <div className="urgency-card" onClick={handleRedirect}>
      <div className="urgency-card-content">
        <h2 className="urgency-title">AI Symptom Analysis</h2>
        <p className="urgency-description">
          Assess your health urgency using AI by describing your symptoms in your own language.
        </p>
        <button className="urgency-button">Check Now</button>
      </div>
    </div>
  );
};

export default UrgencyCheckCard;
