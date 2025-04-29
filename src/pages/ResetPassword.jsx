// import React from 'react'

// export default function ResetPassword() {
//   return (
    
//   )
// }


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      toast.success(res.data.message || 'Reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!');
    }
  };

  const styles = {
    page: {
      height: '100vh',
      background: 'linear-gradient(to bottom right, #c084fc, #818cf8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#111827',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      color: '#fff',
    },
    title: {
      fontSize: '1.75rem',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#cbd5e1',
      fontSize: '0.95rem',
      marginBottom: '1.5rem',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#1f2937',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
    icon: {
      color: '#94a3b8',
      marginRight: '0.75rem',
      fontSize: '1.2rem',
    },
    input: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'white',
      width: '100%',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      border: 'none',
      borderRadius: '0.5rem',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'opacity 0.3s ease',
    },
    buttonHover: {
      opacity: 0.9,
    },
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Reset password</h2>
        <p style={styles.subtitle}>Enter your registered email address</p>
        <div style={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.opacity = styles.buttonHover.opacity)}
          onMouseOut={(e) => (e.target.style.opacity = '1')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
