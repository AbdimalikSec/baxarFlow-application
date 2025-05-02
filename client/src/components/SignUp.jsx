import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { InputContext } from '../context/context';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SignUp = ({ onClose, onSwitchToLogin }) => {
  const { setUser } = useContext(InputContext);
  const [error, setError] = useState('');

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;

      // Reference to the user's document in Firestore
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      let role = 'member'; // Default role

      if (!userDoc.exists()) {
        // Create a new user document with registration flag and default role
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isRegistered: true,
          role: 'member', // Default role set to 'member'
        });
      } else {
        // User document exists, get the role from Firestore
        const userData = userDoc.data(); // Get the user data
        role = userData.role; // Get the role from the document
      }

      // Create a user object with the role
      const userWithRole = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: role, // Include the role here
      };

      setUser(userWithRole); // Set the user object with the role
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

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <button
        onClick={handleGoogleSignUp}
        className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition w-full font-semibold mt-4"
      >
        <FaGoogle className="mr-2" />
        Sign up with Google
      </button>

      <p className="text-gray-600 mt-6 text-center">
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} className="text-blue-600 cursor-pointer hover:underline">
          Log in here
        </span>
      </p>
    </div>
  );
};

export default SignUp;