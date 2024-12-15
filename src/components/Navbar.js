import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../firebase';

const Navbar = ({ user }) => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>ToFuture</h1>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/message" style={styles.link}>Write</Link>
        {user ? (
          <button style={styles.logout} onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000', // Black navbar background
    padding: '1rem',
  },
  logo: {
    color: '#fff', // White logo text
    margin: 0,
  },
  link: {
    color: '#fff', // White links
    textDecoration: 'none',
    margin: '0 1rem',
    fontSize: '1rem',
  },
  logout: {
    color: '#fff', // White text for logout button
    background: 'transparent', // Transparent background
    border: '1px solid #fff', // White border
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease', // Smooth hover effect
  },
  // Add pseudo-class styles for the logout button
  logoutHover: {
    background: '#fff', // White background on hover
    color: '#000', // Black text on hover
  },
  logoutFocus: {
    background: '#fff',
    color: '#000',
  },
  logoutActive: {
    background: '#ccc', // Light grey background when active
    color: '#000',
  },
};

export default Navbar;
