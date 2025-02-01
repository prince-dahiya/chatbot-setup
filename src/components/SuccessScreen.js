import React from 'react';

const SuccessScreen = ({ onExploreAdmin, onStartChatbot }) => {
  return (
    <div className="success-screen">
      <h2>🎉 Integration Successful!</h2>
      <p>Your chatbot has been successfully integrated!</p>
      <button onClick={onExploreAdmin} className="explore-admin-button">Explore Admin Panel</button>
      <button onClick={onStartChatbot} className="start-chatbot-button">Start Talking to Your Chatbot</button>
      <div className="social-media-buttons">
        <button>Share on Facebook</button>
        <button>Share on Twitter</button>
      </div>
    </div>
  );
};

export default SuccessScreen;