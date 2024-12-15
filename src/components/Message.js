import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) {
      alert('Please write your message!');
      return;
    }

    // Navigate to Write.js with the message data
    navigate('/write', {
      state: {
        message, // Pass the message to Write.js
      },
    });
  };

  return (
    <div style={styles.container}>
      <h2>Write Your Letter</h2>
      <div style={styles.editorContainer}>
        <ReactQuill
          value={message}
          onChange={setMessage}
          theme="snow"
          style={styles.editor}
        />
      </div>
      <button onClick={handleSubmit} style={styles.button}>
        Schedule Letter
      </button>
    </div>
  );
};

// Styles for the Message page
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
  },
  editorContainer: {
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
  },
  editor: {
    minHeight: '300px',
  },
  button: {
    backgroundColor: '#000',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Message;
