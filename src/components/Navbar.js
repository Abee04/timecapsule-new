import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import auth object from firebase-config

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {user ? (
        <>
          <span>Welcome, {user.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
