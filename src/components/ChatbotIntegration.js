import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Confetti from 'react-confetti'; // Import the confetti component

const ChatbotIntegration = ({ onSuccess }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [integrationSuccess, setIntegrationSuccess] = useState(null); // null means not tested yet
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false); // State for feedback message

  const handleTestChatbot = () => {
    // Open the client's website with a dummy chatbot integration
    window.open('https://dummy-chatbot-integration.com', '_blank'); // Replace with actual URL
    setShowFeedbackMessage(true); // Show feedback message after testing the chatbot
  };

  const handleIntegrateChatbot = () => {
    setShowInstructions(true);
  };

  const handleMailInstructions = () => {
    alert('Instructions have been sent to the developer.'); // Simulate mailing instructions
  };

  const handleTestIntegration = () => {
    // Simulate integration testing
    const success = Math.random() > 0.5; // Randomly determine success or failure
    setIntegrationSuccess(success);
    setShowSuccessScreen(true); // Show success screen after testing
    if (success) {
      onSuccess(); // Call the success handler passed as a prop
    }
  };

  const handleFeedback = () => {
    alert('Feedback form will be implemented here.'); // Placeholder for feedback functionality
  };

  const handleProceedToIntegration = () => {
    // Navigate to the integration screen
    navigate('/integration'); // Adjust the path as needed
  };

  return (
    <div className="chatbot-integration-container">
      <h2>Chatbot Integration & Testing</h2>
      <button onClick={handleTestChatbot} className="test-chatbot-button">Test Chatbot</button>
      <button onClick={handleIntegrateChatbot} className="integrate-button">Integrate on Your Website</button>

      {showInstructions && (
        <div className="integration-options">
          <h3>Integration Options</h3>
          <p>Follow these easy steps to integrate the chatbot:</p>
          <ol>
            <li>
              Copy and paste the following code within the <code>&lt;head&gt;</code> of your website:
            </li>
            <pre>
              {`<script src="https://dummy-chatbot-integration.com/chatbot.js"></script>`}
            </pre>
            <li>
              After adding the code, save your changes and refresh your website.
            </li>
          </ol>
          <button onClick={handleMailInstructions} className="mail-instructions-button">Mail Instructions to Developer</button>
          <button onClick={handleTestIntegration} className="test-integration-button">Test Integration</button>
        </div>
      )}

      {showSuccessScreen && (
        <div className="integration-status">
          {integrationSuccess ? (
            <div className="success-ui">
              <Confetti /> {/* Show confetti on success */}
              <h3>Integration Successful!</h3>
              <p>🎉 Your chatbot has been successfully integrated!</p>
              <button className="explore-admin-button" onClick={handleProceedToIntegration}>Explore Admin Panel</button>
              <button className="start-chatbot-button" onClick={handleProceedToIntegration}>Start Talking to Your Chatbot</button>
              <div className="social-media-buttons">
                <button>Share on Facebook</button>
                <button>Share on Twitter</button>
              </div>
            </div>
          ) : (
            <div className="failure-ui">
              <h3>Integration Failed!</h3>
              <p>🚫 We could not detect the integration. Please try again.</p>
              <p>Make sure your integration code is correctly placed in the &lt;head&gt; of your website.</p>
              <p>Check for any JavaScript errors in the console.</p>
              <button onClick={handleTestIntegration} className="retry-button">Retry Integration</button>
            </div>
          )}
        </div>
      )}

      {showFeedbackMessage && (
        <div className="top-bar">
          <p>Chatbot not working as intended? <button onClick={handleFeedback} className="feedback-button">Share feedback</button></p>
        </div>
      )}
    </div>
  );
};

export default ChatbotIntegration;