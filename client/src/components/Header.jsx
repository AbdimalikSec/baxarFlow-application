import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Section from './sections';
import { nin } from "../assets";
import { InputContext } from "../context/context";
import { CiUser } from "react-icons/ci";
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import Login from './Login';
import SignUp from './SignUp';

const Header = () => {
  const { user, setUser } = useContext(InputContext);
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const [modal, setModal] = useState(null); 

  const handleInputChange = (event) => {
    setIsTyping(event.target.value !== "");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHidden(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <>
      <div className="navbar">
        {/* Logo and Search */}
        <div className="searchUser searchIconMobile">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="logo">BaxarFlow</h1>
          </Link>
        </div>

        {user && !isTyping && (
          <>
            <div style={{ marginLeft: '650px', position: "absolute" }}>
              <FaSearch />
            </div>
            <input
              type="text"
              ref={inputRef}
              onChange={handleInputChange}
              placeholder="Search"
              style={{ borderStyle: "gray" }}
            />
          </>
        )}

        {/* Right Section */}
        <div className="imageAndNav" style={{ marginRight: '50px' }}>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>{user.displayName || user.email}</span>
              <img
                className="userImg"
                src={user.photoURL || nin}
                onClick={() => setOpen(!open)}
                alt="User Avatar"
                style={{ cursor: "pointer" }}
              />
            </>
          ) : (
            <button
              onClick={() => setModal('login')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>

        {/* User Info */}
        {open && !isHidden && user && (
          <div className="userInfo">
            <Link style={{ textDecoration: "none" }} to="/profile">
              <div className="userProfileIcon">
                <p>Profile</p>
                <p><CiUser /></p>
              </div>
            </Link>
            <div className="userProfileIcon">
              <p>Email: {user.email}</p>
            </div>
            <div className="userProfileIcon">
              <p>Display Name: {user.displayName}</p>
            </div>
            <div className="userProfileIcon">
              <p>Role: {user.role}</p>
            </div>
            <div onClick={logout} className="userProfileIcon">
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === 'login' && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <Login onClose={() => setModal(null)} onSwitchToSignUp={() => setModal('signup')} />
        </div>
      )}

      {modal === 'signup' && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <SignUp onClose={() => setModal(null)} onSwitchToLogin={() => setModal('login')} />
        </div>
      )}
      
      <Section />
      <hr />
    </>
  );
};

export default Header;