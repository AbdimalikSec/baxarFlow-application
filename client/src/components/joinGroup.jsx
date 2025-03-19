import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Sidebar from './Homesidebar';
import { FaUserLock, FaUsers, FaRegMoneyBillAlt, FaStar } from 'react-icons/fa';

const JoinGroup = () => {
  const [modal, setModal] = useState(null); // 'signup' | 'login' | null

  return (
    <div className={`flex justify-center items-center min-h-screen px-4 py-10 transition-all duration-300 ${modal ? 'backdrop-blur-sm' : ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Left Box */}
        <div className="p-10 bg-white rounded-2xl shadow-xl flex flex-col items-center w-full">
          <h1 className="text-3xl font-extrabold mb-6 text-center">CyberHack Community</h1>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center">
              <FaUserLock className="text-blue-500 mr-2 text-xl" />
              <p className="text-lg">Private</p>
            </div>
            <div className="flex items-center">
              <FaUsers className="text-green-500 mr-2 text-xl" />
              <p className="text-lg">9.1k members</p>
            </div>
            <div className="flex items-center">
              <FaRegMoneyBillAlt className="text-orange-500 mr-2 text-xl" />
              <p className="text-lg">Free</p>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-2 text-xl" />
              <p className="text-lg">By CyberHack ⭐</p>
            </div>
          </div>
          <p className="text-gray-700 text-center leading-relaxed">
            👋 Join a thriving cybersecurity community led by FOUR industry experts with over 30 years’ experience.
            Access free hands-on project tutorials, career guidance, and connect with like-minded professionals working
            to break into cybersecurity. Develop your skills and momentum - join for free today!
          </p>
        </div>

        {/* Right Box */}
        <div className="p-10 bg-white rounded-2xl shadow-xl flex flex-col items-center w-full">
          <Sidebar />
          <button
            onClick={() => setModal('signup')}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Join Group
          </button>
        </div>
      </div>

      {/* SignUp Modal */}
      {modal === 'signup' && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <SignUp onClose={() => setModal(null)} onSwitchToLogin={() => setModal('login')} />
        </div>
      )}

      {/* Login Modal */}
      {modal === 'login' && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Login onClose={() => setModal(null)} onSwitchToSignUp={() => setModal('signup')} />
        </div>
      )}
    </div>
  );
};

export default JoinGroup;
