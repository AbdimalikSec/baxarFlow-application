import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { InputContext } from '../context/context';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SignUp = ({ onClose, onSwitchToLogin }) => {
  const { setUser } = useContext(InputContext);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleEmailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'users', user.uid);
      
      await setDoc(userRef, {
        displayName: displayName,
        email: email,
        photoURL: '',
        isRegistered: true,
        role: 'member',
      });

      const userWithRole = {
        uid: user.uid,
        displayName: displayName,
        email: email,
        photoURL: '',
        role: 'member',
      };

      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      onClose();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please sign in.');
      } else {
        setError('Failed to sign up. Please check your details and try again.');
      }
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isRegistered: true,
          role: 'member',
        });
      }

      setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'member',
      });

      localStorage.setItem("user", JSON.stringify(userWithRole));
      onClose();
    } catch (error) {
      setError('Failed to sign up with Google. Please try again.');
    }
  };

  return (
    <div className="relative  bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg mx-auto mt-20">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition">
        <FaTimes size={20} />
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <input
        type="text"
        placeholder="Full Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="border rounded w-full p-3 mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded w-full p-3 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded w-full p-3 mb-4"
      />

      <button
        onClick={handleEmailSignUp}
        className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition w-full font-semibold mt-4"
      >
        Sign Up with Email
      </button>

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