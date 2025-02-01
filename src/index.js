import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your App component
import './index.css'; // Import your CSS

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);