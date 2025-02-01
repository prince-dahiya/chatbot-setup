import React from 'react';


const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>🎉 Welcome to Your New Chatbot!</h1>
        <p>Open source and ready to transform your interactions.</p>
        <p>Available on web, app, and API. Click to get started!</p>
      </header>
      <section className="cta-section">
        <h2>Into the Future of AI</h2>
        <button className="start-button" onClick={onStart}>Start Now</button>
        <p>Free access to our intelligent chatbot model. Experience the future of AI.</p>
        <button className="get-app-button">Get the Chatbot App</button>
        <p>Chat on the go with our advanced AI tool.</p>
      </section>
      <div className="wavy-animation"></div>
    </div>
  );
};

export default LandingPage;