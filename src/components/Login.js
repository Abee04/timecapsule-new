import React from 'react';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import timeImage from '../assets/time1.jpg'; // Path to your image

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await signInWithGoogle();
    navigate('/');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}>
        <h2 style={styles.heading}>Login</h2>
        <button style={styles.button} onClick={handleLogin}>
          Login with Google
        </button>
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
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    background: '#FF6F3C',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default Login;
