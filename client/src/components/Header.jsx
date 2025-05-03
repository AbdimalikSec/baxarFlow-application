import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Section from "./sections";
import { nin } from "../assets";
import { InputContext } from "../context/context";
import { CiUser } from "react-icons/ci";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import SignUp from "./SignUp";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Header = () => {
  const { user, setUser } = useContext(InputContext);
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setIsTyping(event.target.value !== "");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHidden(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        const userData = userSnap.exists()
          ? userSnap.data()
          : { role: "member" };

        const fullUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          role: userData.role,
        };

        setUser(fullUser);
        localStorage.setItem("user", JSON.stringify(fullUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [setUser]);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <>
      <div className="navAndSecHaye">
        <div className="navbar">
          {/* Logo and Search */}
          <div className="searchUser searchIconMobile">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="logo">BaxarFlow</h1>
            </Link>
          </div>

          {user && (
            <div style={{ position: "relative", marginLeft: "50px" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#888",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                ref={inputRef}
                onChange={handleInputChange}
                placeholder="Search"
                style={{
                  paddingLeft: "35px",
                  paddingRight: "200px",
                  height: "30px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  backgroundColor: isTyping ? "#f0f0f0" : "white",
                }}
              />
            </div>
          )}

          {/* Right Section */}
          <div className="imageAndNav" style={{ marginRight: "50px" }}>
            {user ? (
              <div className="userImg">
                <img
                  src={user.photoURL || nin}
                  onClick={() => setOpen(!open)}
                  alt="User Avatar"
                />
              </div>
            ) : (
              <button
                onClick={() => setModal("login")}
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
              <div className="userProfileIcon"><p>Email: {user.email}</p></div>
              <div className="userProfileIcon"><p>Name: {user.displayName}</p></div>
              <div className="userProfileIcon"><p>Role: {user.role}</p></div>
              <div
                style={{ cursor: "pointer" }}
                onClick={logout}
                className="userProfileIcon"
              >
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {modal === "login" && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <Login
              onClose={() => setModal(null)}
              onSwitchToSignUp={() => setModal("signup")}
            />
          </div>
        )}
        {modal === "signup" && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <SignUp
              onClose={() => setModal(null)}
              onSwitchToLogin={() => setModal("login")}
            />
          </div>
        )}

        <Section />
      </div>
    </>
  );
};

export default Header;
