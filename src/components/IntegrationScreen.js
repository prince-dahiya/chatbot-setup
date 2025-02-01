import React from 'react';

const IntegrationScreen = ({ onFeedback }) => {
  return (
    <div className="integration-screen">
      <h2>Integration Process</h2>
      <p>Your chatbot is being integrated. Please wait...</p>
      {/* Add any additional integration details or progress indicators here */}
      
      <div className="feedback-message">
        <p>Chatbot not working as intended? <button onClick={onFeedback} className="feedback-button">Share feedback</button></p>
      </div>
    </div>
  );
};

export default IntegrationScreen;