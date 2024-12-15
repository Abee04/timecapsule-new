import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function SignUp() {
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User Info:', result.user);
    } catch (error) {
      console.error('Error during sign-up:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sign Up</h2>
      <button
        onClick={handleGoogleSignUp}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Sign Up with Google
      </button>
    </div>
  );
}

export default SignUp;
