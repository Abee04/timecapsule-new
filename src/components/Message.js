import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

// Custom Toolbar with tooltips
const CustomToolbar = () => (
  <div id="toolbar">
    {/* Headings */}
    <span className="ql-formats">
      <select className="ql-header" defaultValue="" title="Heading">
        <option value="">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>
    </span>
    {/* Font Families */}
    <span className="ql-formats">
      <select className="ql-font" defaultValue="" title="Font Family">
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>
    </span>

    {/* Text Formatting */}
    <span className="ql-formats">
      <button className="ql-bold" title="Bold"></button>
      <button className="ql-italic" title="Italic"></button>
      <button className="ql-underline" title="Underline"></button>
      <button className="ql-strike" title="Strikethrough"></button>
    </span>

    {/* Lists */}
    <span className="ql-formats">
      <button className="ql-list" value="ordered" title="Ordered List"></button>
      <button className="ql-list" value="bullet" title="Bullet List"></button>
    </span>

    {/* Alignment */}
    <span className="ql-formats">
      <select className="ql-align" defaultValue="" title="Text Alignment">
        <option></option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
      </select>
    </span>

<<<<<<< HEAD
     {/* Colors */}
     <span className="ql-formats">
      <button className="ql-color" title="Text Color"></button>
      <button className="ql-background" title="Text Background Color"></button>
=======
    {/* Text Color & Background Color */}
    <span className="ql-formats">
      <select className="ql-color" title="Text Color"></select>
      <select className="ql-background" title="Background Color"></select>
>>>>>>> 0c0b7a6e71e41b5afafb55da79e59bf4fcc4b5da
    </span>

    {/* Quotes */}
    <span className="ql-formats">
      <button className="ql-code-block" title="Code Block"></button>
    </span>


    {/* Links and Images */}
    <span className="ql-formats">
      <button className="ql-link" title="Insert Link"></button>
      <button className="ql-image" title="Insert Image"></button>
    </span>
  </div>
);

const Message = () => {
  const [message, setMessage] = useState(""); // State for message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please write your message!");
      return;
    }

    // Navigate to another page with message data
    navigate("/write", {
      state: { message },
    });
  };

  const handleInspireMe = () => {
    setMessage(
      `<p><strong>Dear Future Me,</strong></p><p>I hope this message finds you well. Here's what I want to remind you of today:</p>`
    );
  };

  return (
    <div style={styles.container}>
      <h2>Write Your Letter</h2>

      <div style={styles.editorContainer}>
        {/* Custom Toolbar */}
        <CustomToolbar />

        {/* ReactQuill Editor */}
        <ReactQuill
          value={message}
          onChange={setMessage}
          theme="snow"
          modules={Message.modules}
          placeholder="Start your letter here..."
          style={styles.editor}
        />

        {/* Inspire Me Button */}
        <button onClick={handleInspireMe} style={styles.inspireButton}>
          Inspire Me!
        </button>
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} style={styles.button}>
        Schedule Letter
      </button>
    </div>
  );
};

// Quill Toolbar Modules
Message.modules = {
  toolbar: {
    container: "#toolbar", // Use custom toolbar
  },
};

<<<<<<< HEAD
=======

Message.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "code-block",
  "link",
  "image",
];

>>>>>>> 0c0b7a6e71e41b5afafb55da79e59bf4fcc4b5da
// Styles
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    textAlign: "center",
  },
  editorContainer: {
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "1rem",
  },
  editor: {
    minHeight: "250px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#000",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  inspireButton: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    color: '#000', // White text for logout button
    background: 'transparent', // Transparent background
    border: '1px solid #000', // White border
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    fontWeight: "bold",
  },
};

export default Message;
