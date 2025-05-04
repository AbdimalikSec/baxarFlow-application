import React, { useState, useContext, useEffect } from "react";
import { forwardRef } from "react";
import { mustafa, nin } from "../assets";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { InputContext } from "../context/context";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const sidebar = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { user } = useContext(InputContext);
  const [members, setMembers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleUserNoteToggle = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  const referralLink =
    "https://www.skool.com/cybersec/about?ref=4660ce640b4f4867bd5433a0ddf6be74";

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersCollection = collection(db, "users");
        const memberSnapshot = await getDocs(membersCollection);
        const memberList = memberSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(memberList);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Link copied to clipboard!");
  };

  const totalMembers = members.length;
  const totalAdmins = members.filter(
    (member) => member.role === "admin"
  ).length;
  const totalOnline = members.filter(
    (member) => member.isOnline === true
  ).length; // Only if you store `isOnline` field

  return (
    <div>
      <div>
        {user && (
          <>
           {/*  <img src={user.photoURL || nin} className="sidebarNin" alt="" /> */}
           <img src={mustafa} className="sidebarNin"alt="" />
            <h3>CyberHack - Community</h3>
          </>
        )}
        {!user && (
          <>
            <img src={nin} className="sidebarNin" alt="" />
            <h3>no user</h3>
          </>
        )}
        <span>17Followers</span>
      </div>
     
      <div className="members">
        <p>Stop theory, start doing cyber! Get free hands-on projects & practical 
        skill-building guidance to gain foundational skills for a cybersecurity career.</p>
        <br />
        <div className="footerSidebar">
          <p>{totalMembers} members</p>
          <p>{totalOnline} online</p>
          <p>{totalAdmins} admins</p>
        </div>
        <Link>
          <p className="seeall">seeAll(18)</p>
        </Link>
      </div>

      <button
        onClick={() => setShowInviteModal(true)}
        className="w-full py-3 mt-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition duration-300"
      >
        Invite People
      </button>

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

export default sidebar;
