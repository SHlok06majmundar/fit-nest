import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config';

const FailureResponse = () => {
  const [errorDetails, setErrorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchErrorDetails = async () => {
      try {
        const response = await axios.get(API.PAYMENT.GET_ERROR_DETAILS, { withCredentials: true });
        setErrorDetails(response.data);
      } catch (error) {
        console.error('Error fetching error details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchErrorDetails();
  }, []);

  // ... rest of the component code remains the same ...
}; 