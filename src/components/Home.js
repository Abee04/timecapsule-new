import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <div style={styles.home}>
      <h1>Welcome to ToFuture</h1>
      {user ? (
        <h2>Hello, {user.displayName}!</h2>
      ) : (
        <Link to="/login">
          <button style={styles.getStarted}>Get Started</button>
        </Link>
      )}
    </div>
  );
};

const styles = {
  home: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
  },
  getStarted: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Home;
