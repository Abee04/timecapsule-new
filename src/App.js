import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Write from './components/Write';
import Login from './components/Login';
import Message from './components/Message';
import ComposeMail from './components/ComposeMail';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/message" element={<Message />} />
        <Route path="/composemail" element={<ComposeMail />} />
      </Routes>
    </>
  );
};

export default App;
