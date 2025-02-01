import React, { useState, useEffect } from 'react';
import UserRegistration from './components/UserRegistration';
import SetupOrganisation from './components/SetupOrganisation';
import ChatbotIntegration from './components/ChatbotIntegration';
import SuccessScreen from './components/SuccessScreen';
import EmailVerification from './components/EmailVerification';
import LandingPage from './components/LandingPage';
import IntegrationScreen from './components/IntegrationScreen'; // Import the Integration Screen
import './App.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleIntegrationSuccess = () => {
    setIntegrationSuccess(true);
    handleNextStep(); // Move to the next step (SuccessScreen)
  };

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
    handleNextStep();
  };

  const handleVerificationComplete = () => {
    handleNextStep();
  };

  useEffect(() => {
    if (isRegistered) {
      document.body.classList.add('registration-complete');
    }
    if (step === 4) {
      document.body.classList.add('chatbot-integration');
    } else {
      document.body.classList.remove('chatbot-integration');
    }
  }, [isRegistered, step]);

  return (
    <>
    {/* Falling Light Elements */}
    {[...Array(10)].map((_, index) => (
      <div key={index} className="light" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}></div>
    ))}
    <div className="app-container">
      <h1>Chatbot Setup</h1>
      {integrationSuccess ? (
        <SuccessScreen />
      ) : (
        <>
          {step === 0 && <LandingPage onStart={handleNextStep} />}
          {step === 1 && <UserRegistration onNext={handleRegistrationComplete} onBack={handleBackStep} />}
          {step === 2 && <EmailVerification onVerify={handleVerificationComplete} onBack={handleBackStep} />}
          {step === 3 && <SetupOrganisation onNext={handleNextStep} onBack={handleBackStep} />}
          {step === 4 && <ChatbotIntegration onSuccess={handleIntegrationSuccess} />}
          {step === 5 && <IntegrationScreen onFeedback={() => alert('Feedback form will be implemented here.')} onBack={handleBackStep} />}
        </>
      )}
      <div className="walking-bot"></div>
    </div>
    </>
  );
};

export default App;