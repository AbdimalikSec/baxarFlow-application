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
  const modalRef = useRef(null);
  const imageRef = useRef(null);

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

    return () => unsubscribe();
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

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      imageRef.current &&
      !imageRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Prevent closing modal when clicking inside it
  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="navAndSecHaye">
        <div className="navbar">
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

          <div className="imageAndNav" style={{ marginRight: "50px" }}>
            {user ? (
              <div className="userImg">
                <img
                  ref={imageRef}
                  src={user.photoURL || nin}
                  onClick={() => setOpen((prev) => !prev)}
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

          {open && !isHidden && user && (
            <div
              ref={modalRef}
              className="userInfo"
              style={{
                width: "340px",
                background: "black",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
              onClick={handleModalClick} // Ensure this calls the stopPropagation function
            >
              <Link
                to="/userProfile"
                style={{ textDecoration: "none" }}
                onClick={() => setOpen(false)}
              >
                <div
                  className="userProfileIcon"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <CiUser />
                  <p style={{ marginRight: "10px" }}>Profile</p>
                </div>
              </Link>
              <div className="userProfileIcon">
                <p>{user.email}</p>
              </div>
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
