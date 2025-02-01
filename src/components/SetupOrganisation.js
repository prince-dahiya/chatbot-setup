import React, { useState } from 'react';

const SetupOrganisation = ({ onNext, onBack }) => {
  const [companyName, setCompanyName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [webpages, setWebpages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State for feedback message

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFeedbackMessage('Organization setup completed!'); // Set feedback message
    handleFetchMetaDescription(); // Fetch meta description after setup
  };

  const handleFetchMetaDescription = async () => {
    if (!websiteURL) {
      setFeedbackMessage('Please enter a valid website URL.');
      return;
    }

    try {
      const response = await fetch(websiteURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content');

      if (metaDescription) {
        setDescription(metaDescription);
        setFeedbackMessage('Meta description fetched successfully.'); // Set success message
      } else {
        setDescription(''); // Clear previous description
        setFeedbackMessage('No meta description found, but you can still proceed.'); // Set no description message
      }
    } catch (error) {
      console.error('Error fetching meta description:', error);
      setFeedbackMessage('Error fetching meta description. Please check the URL and try again.'); // Set error message
    }
  };

  const handleFetchWebpages = () => {
    if (!companyName || !websiteURL) {
      setFeedbackMessage('Please enter both company name and website URL.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const numberOfPages = Math.floor(Math.random() * 10) + 1; // Random number of pages between 1 and 10
      const dummyWebpages = Array.from({ length: numberOfPages }, (_, index) => ({
        url: `${websiteURL}/page${index + 1}`,
        status: index % 2 === 0 ? 'scraped' : 'pending',
        dataChunks: index % 2 === 0 ? [`Chunk ${index + 1} Data 1`, `Chunk ${index + 1} Data 2`] : [],
      }));
      setWebpages(dummyWebpages);
      setLoading(false);
      setFeedbackMessage('Webpages fetched successfully.'); // Set success message
    }, 2000);
  };

  const handleViewDataChunks = (page) => {
    setSelectedPage(page);
  };

  const handleBackToWebpages = () => {
    setSelectedPage(null);
  };

  const handleStartTraining = () => {
    setTrainingInProgress(true);
    setTimeout(() => {
      setFeedbackMessage('Chatbot training completed!'); // Set training completion message
      setTrainingInProgress(false);
      onNext(); // Move to the next step after training
    }, 5000);
  };

  const handleOpenWebpage = (url) => {
    window.open(url, '_blank'); // Open the webpage in a new tab
  };

  return (
    <div className={`app-container ${isSubmitted ? 'submitted' : ''}`}>
      {!isSubmitted ? (
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>Setup Organisation</h2>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="vibrant-input"
          />
          <input
            type="url"
            placeholder="Website URL"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            required
            className="vibrant-input"
          />
          <textarea
            placeholder="Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="vibrant-textarea"
          />
          <button type="button" onClick={handleFetchMetaDescription} className="fetch-button">Fetch Meta Description</button>
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="back-button" onClick={onBack}>Back</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>Setup Successful!</h2>
          <p>Your organization has been set up successfully.</p>
          <button onClick={handleFetchWebpages} className="fetch-webpages-button">Fetch Webpages</button>
          {loading && <p>Loading webpages...</p>}
          {!loading && webpages.length > 0 && !selectedPage && (
            <div className="webpages-list">
              <h3>Detected Webpages:</h3>
              <ul>
                {webpages.map((page, index) => (
                  <li key={index}>
                    <span>{page.url} - {page.status}</span>
                    {page.status === 'scraped' && (
                      <button onClick={() => handleViewDataChunks(page)}>View Data Chunks</button>
                    )}
                    <button onClick={() => handleOpenWebpage(page.url)}>Open Webpage</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPage && (
            <div className="webpage-details">
              <h3>Data Chunks for {selectedPage.url}:</h3>
              <ul>
                {selectedPage.dataChunks.length > 0 ? (
                  selectedPage.dataChunks.map((chunk, index) => (
                    <li key={index}>{chunk}</li>
                  ))
                ) : (
                  <li>No data chunks available.</li>
                )}
              </ul>
              <button onClick={handleBackToWebpages}>Back to Webpages</button>
            </div>
          )}
          {/* Display Meta Description */}
          <div className="meta-description">
            {description && (
              <>
                <h4>Meta Description:</h4>
                <p>{description}</p>
              </>
            )}
          </div>
          <button onClick={handleStartTraining} className="start-training-button" disabled={trainingInProgress}>
            {trainingInProgress ? 'Training in Progress...' : 'Start Training'}
          </button>
          <button type="button" className="skip-button" onClick={onNext}>Skip to Next Step</button>
          <button type="button" className="back-button" onClick={onBack}>Back</button>
        </div>
      )}
      {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>} {/* Display feedback messages */}
    </div>
  );
};

export default SetupOrganisation;