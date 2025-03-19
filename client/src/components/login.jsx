import React, { useState, useContext } from 'react';
import { auth } from '../firebase';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { InputContext } from '../context/context';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Login = ({ onClose, onSwitchToSignUp }) => {
  const { setUser } = useContext(InputContext);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Reference to the user's document in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists() || !userDoc.data().isRegistered) {
        await signOut(auth);
        setError('No account found. Please sign up first.');
        return;
      }
  
     // User is registered; proceed with login
     const userData = userDoc.data();
     setUser({ ...user, role: userData.role }); // Set user with role
     onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition">
        <FaTimes size={20} />
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Log In</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition w-full font-semibold mt-4"
      >
        <FaGoogle className="mr-2" />
        Sign in with Google
      </button>

      <p className="text-gray-600 mt-6 text-center">
        Don't have an account?{' '}
        <span onClick={onSwitchToSignUp} className="text-green-600 cursor-pointer hover:underline">
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default Login;
