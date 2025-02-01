import React, { useState, useEffect, useCallback } from 'react';

const UserRegistration = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  const handleCredentialResponse = useCallback((response) => {
    const id_token = response.credential;

    // Decode the ID token to get user information
    const userData = JSON.parse(atob(id_token.split('.')[1]));
    setUserProfile(userData);
    console.log('User  Data:', userData);
  }, []);

  useEffect(() => {
    // Load the Google API script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: '367254995190-fju4kdcr7dehbctl9sucpmvmgko214bv.apps.googleusercontent.com', // Replace with your client ID
          callback: handleCredentialResponse,
          auto_select: false,
          prompt: 'select_account', // This will prompt the user to select an account
        });
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, [handleCredentialResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Email verification sent!');
    setIsSubmitted(true); // Set submitted state to true
    setTimeout(onNext, 2000); // Move to the next step after 2 seconds
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError(null); // Reset error state before attempting sign-in
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        setError('Google Sign-In prompt not displayed. Please try again.');
        setLoading(false);
      }
    });
  };

  return (
    <div className={`app-container ${isSubmitted ? 'submitted' : ''}`}>
      {!isSubmitted ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>User Registration</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="google-button" onClick={handleGoogleSignIn} disabled={loading}>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>Check your email for verification.</p>
          {userProfile && (
            <div>
              <h3>Welcome, {userProfile.name}!</h3>
              <p>Email: {userProfile.email}</p>
              <img src={userProfile.picture} alt="Profile" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserRegistration;