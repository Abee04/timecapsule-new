import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import timeImage from '../assets/Story.jpg';

const Login = () => {
  const [isSigningIn, setIsSigningIn] = useState(false); // Track signing-in status
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isSigningIn) return; // Prevent multiple clicks
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSigningIn(false); // Re-enable the button
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}>
        <h2 style={styles.heading}>Login</h2>
        <button
          style={{
            ...styles.googleButton,
            cursor: isSigningIn ? 'not-allowed' : 'pointer',
            opacity: isSigningIn ? 0.6 : 1, // Visual feedback for disabled button
          }}
          onClick={handleLogin}
          disabled={isSigningIn}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={styles.googleLogo}
          />
          <span style={styles.googleText}>Sign in with Google</span>
        </button>
        <p style={styles.toFutureMeText}>Your future self will thank you!</p>      
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${timeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black semi-transparent overlay
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem',
    zIndex: 1,
  },
  heading: {
    fontSize: '2rem',
    color: '#fff',
    marginBottom: '1.5rem',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    color: '#000',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background 0.3s',
  },
  googleLogo: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  googleText: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  toFutureMeText: {
    fontSize: '1rem',
    color: '#fff',
    marginTop: '1rem',
    fontStyle: 'italic',
  }
};

export default Login;
