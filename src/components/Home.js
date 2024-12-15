import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Story.jpg'; // Path to your image

const Home = ({ user }) => {
  return (
    <div style={styles.home}>
      <div style={styles.overlay}>
        {user ? (
          <>
            {/* Personalized Welcome Message */}
            <h2 style={styles.user}>Hello, {user.displayName}!</h2>
            <h1 style={styles.title}>Welcome to ToTheFuture</h1>
            <p style={styles.description}>
              Ready to time capsule your messages? <br />
              Let your words travel through time. Start your journey with ToTheFuture today! <br />
            </p>
            {/* Get Started Button (After Login) */}
            <Link to="/Message">
              <button style={styles.getStarted}>GET STARTED</button>
            </Link>
          </>
        ) : (
          <>
            {/* Default Content for Non-Logged In Users */}
            <h1 style={styles.title}>Welcome to ToTheFuture</h1>
            <p style={styles.description}>
              Ready to time capsule your messages? <br />
              Let your words travel through time. Start your journey with ToTheFuture today! <br />
            </p>
            {/* Get Started Button (Before Login) */}
            <Link to="/login">
              <button style={styles.getStarted}>GET STARTED</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

// Styles for Home Component
const styles = {
  home: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.5',
    marginBottom: '2rem',
  },
  user: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  getStarted: {
    padding: '0.8rem 1.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#FF6F3C',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default Home;
