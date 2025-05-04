import React, { useState, useEffect, useContext } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Sidebar from "./Homesidebar";
import { FaUserLock, FaUsers, FaRegMoneyBillAlt, FaStar } from "react-icons/fa";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { hope } from "../assets";
import { InputContext } from "../context/context";

const About = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { user } = useContext(InputContext); // ✅ using context to get user

  const referralLink =
    "https://www.skool.com/cybersec/about?ref=4660ce640b4f4867bd5433a0ddf6be74";

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const membersCollection = collection(db, "users");
        const memberSnapshot = await getDocs(membersCollection);
        setMemberCount(memberSnapshot.size);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMemberCount();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Left Box */}
        <div className="p-10 bg-white rounded-2xl shadow-xl flex flex-col items-center w-full">
          <h1 className="text-3xl font-extrabold mb-6 text-center">
            CyberHack Community
          </h1>
          <img src={hope} alt="" />
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center">
              <FaUserLock className="text-blue-500 mr-2 text-xl" />
              <p className="text-lg">Private</p>
            </div>
            <div className="flex items-center">
              <FaUsers className="text-green-500 mr-2 text-xl" />
              <p className="text-lg">{memberCount.toLocaleString()} members</p>
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
            👋 Join a thriving cybersecurity community led by FOUR industry
            experts with over 30 years’ experience. Access free hands-on project
            tutorials, career guidance, and connect with like-minded
            professionals working to break into cybersecurity. Develop your
            skills and momentum - join for free today!
          </p>
        </div>

        {/* Right Box */}
        <div className="p-10 bg-white rounded-2xl shadow-lg flex flex-col w-full">
          <Sidebar />
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-2">Invite people</h1>
            <p className="mb-4 text-gray-700">
              Invite your friends to Cyber Hub | Empirical Training
            </p>
            <div className="bg-gray-100 p-3 rounded text-sm break-words mb-4">
              {referralLink}
            </div>
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Copy
            </button>
            <button
              onClick={() => setShowInviteModal(false)}
              className="block mt-4 text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
