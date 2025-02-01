import React, { useState } from 'react';

const EmailVerification = ({ onVerify }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [isVerified, setIsVerified] = useState(false); // State for successful verification

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Simulate a delay for verification
    setTimeout(() => {
      if (code === '123456') { // Replace with actual verification logic
        setIsVerified(true);
        alert('Verification successful!'); // Notify user of success
        document.body.style.backgroundColor = '#0d0d1a'; // Change background color
        document.querySelector('.verification-container').style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Change container color
        onVerify(); // Proceed to the next step after successful verification
      } else {
        setError('Invalid verification code. Please try again.');
      }
      setIsLoading(false); // Stop loading
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isVerified ? (
        <p style={{ color: 'green' }}>Your email has been verified successfully!</p>
      ) : (
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailVerification;