import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../config';

const MembersAddDialog = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API.MEMBERS.ADD_MEMBER, formData, { withCredentials: true });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component code remains the same ...
}; 