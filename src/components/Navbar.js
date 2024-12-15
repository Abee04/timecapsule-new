import React from 'react';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';

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
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000', padding: '1rem' }, // Changed to black
  logo: { color: '#fff', margin: 0 },
  link: { color: '#fff', textDecoration: 'none', margin: '0 1rem', fontSize: '1rem' },
  logout: { background: '#ff4c4c', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }
};

export default Navbar;
