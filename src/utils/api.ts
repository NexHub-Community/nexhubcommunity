/// <reference types="vite/client" />
import axios from 'axios';

// Determine the base URL for API requests
const getBaseUrl = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // In production, use environment variable or fall back to window.location.origin
    if (import.meta.env.PROD) {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('Production API URL:', apiUrl);
      return apiUrl || window.location.origin;
    }
    // In development, use the backend server port
    console.log('Development API URL: http://localhost:5000');
    return 'http://localhost:5000';
  }
  return '';
};

// Get the base URL once to avoid recalculation
const baseURL = getBaseUrl();
console.log('API baseURL configured as:', baseURL);

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 15000,
});

// Log API requests for debugging
api.interceptors.request.use(request => {
  console.log('API Request:', request.method, request.url);
  if (request.baseURL && request.url) {
    console.log('Request full URL:', request.baseURL + request.url);
  }
  console.log('Request headers:', request.headers);
  if (request.data) {
    console.log('Request payload:', JSON.stringify(request.data).substring(0, 500));
  }
  return request;
});

// Log API responses for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response Success:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Error:', error.message);
    
    // Network errors (no response from server)
    if (!error.response) {
      console.error('Network Error - No response received from server');
      if (error.config?.baseURL && error.config?.url) {
        console.error('Request was sent to:', error.config.baseURL + error.config.url);
      }
      console.error('Check if the server is running and accessible');
      console.error('Also verify CORS settings on the server');
      
      // Create a more descriptive error
      const enhancedError = new Error(
        `Network Error: Could not connect to the API server at ${error.config?.baseURL}. ` +
        'Please ensure the server is running and accessible. ' +
        'This could be due to server downtime, network connectivity issues, or CORS configuration.'
      );
      
      return Promise.reject(enhancedError);
    }
    
    // Server responded with error status
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
      
      const statusCode = error.response.status;
      let errorMessage = `Server Error (${statusCode}): `;
      
      // Add specific messages based on status code
      if (statusCode === 404) {
        errorMessage += 'The requested endpoint was not found on the server. Check your API path.';
      } else if (statusCode === 401 || statusCode === 403) {
        errorMessage += 'Authentication or permission error. You may not have access to this resource.';
      } else if (statusCode === 500) {
        errorMessage += 'The server encountered an internal error. Please check server logs.';
      } else if (statusCode === 422 || statusCode === 400) {
        errorMessage += 'Invalid data submitted. Please check form fields and try again.';
      } else {
        errorMessage += error.response.data?.message || 'Unknown server error';
      }
      
      const enhancedError = new Error(errorMessage);
      return Promise.reject(enhancedError);
    }
    
    return Promise.reject(error);
  }
);

// API functions for event registration
export const submitEventRegistration = async (eventData: any) => {
  try {
    console.log('Submitting event registration:', eventData);
    const response = await api.post('/api/send-registration-email', eventData);
    return response.data;
  } catch (error) {
    console.error('Event registration API error:', error);
    throw error;
  }
};

// API functions for recruitment applications
export const submitRecruitmentApplication = async (applicationData: any) => {
  try {
    console.log('Submitting recruitment application:', applicationData);
    const response = await api.post('/api/submit-recruitment', applicationData);
    return response.data;
  } catch (error) {
    console.error('Recruitment application API error:', error);
    throw error;
  }
};

export default api;