import React, { useState, useContext } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { InputContext } from '../context/context';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Login = ({ onClose, onSwitchToSignUp }) => {
  const { setUser } = useContext(InputContext);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists() || !userDoc.data().isRegistered) {
        await signOut(auth);
        setError('No account found. Please sign up first.');
        return;
      }

      const userData = userDoc.data();
      setUser({ ...user, role: userData.role });
      onClose();
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.'); // Custom error message
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists() || !userDoc.data().isRegistered) {
        await signOut(auth);
        setError('No account found. Please sign up first.');
        return;
      }

      const userData = userDoc.data();
      setUser({ ...user, role: userData.role });
      onClose();
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.'); // Custom error message
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg mx-auto m-20">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition">
        <FaTimes size={20} />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Log In</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      
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
        onClick={handleEmailSignIn}
        className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition w-full font-semibold mt-4"
      >
        Log In with Email
      </button>

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