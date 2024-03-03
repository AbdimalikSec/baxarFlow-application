import React from "react";
import { Link } from "react-router-dom";
import { nin } from "../assets";
import { useState, useEffect, useRef, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { InputContext } from "../context/context";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const Header = () => {
  const { user } = useContext(InputContext);
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setIsTyping(event.target.value !== ""); // Update typing state based on input value
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <>
      <div className="navbar">
        {user ? (
          <>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="logo">BaxarFlow</h1>
            </Link>
            <Link style={{ textDecoration: "none" }}>
              <div className="searchUser searchIconMobile">
                <div>
                  {!isTyping && ( // Conditionally render the search icon
                    <FaSearch className="searchIcon iconInMobile" />
                  )}
                  <input
                    type="text"
                    ref={inputRef}
                    onChange={handleInputChange}
                    placeholder="Search"
                    className="userDisplayInputDesktop"
                  />
                </div>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="logo">BaxarFlow</h1>
            </Link>
          </>
        )}
        {!user && (
          <>
            <nav className="navka">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/signin">Write</Link>
                </li>
                <li>
                  <Link to="/signin">signin</Link>
                </li>
                <li>
                  <Link to="/signup">signup</Link>
                </li>
              </ul>
            </nav>
            <div className="userProfile">
              <Link>
                <div className="search">
                  <div>
                    {!isTyping && ( // Conditionally render the search icon
                      <FaSearch className="searchIcon" />
                    )}
                    <input
                      type="text"
                      ref={inputRef}
                      onChange={handleInputChange}
                      placeholder="Search"
                    />
                  </div>
                  <img
                    className="username"
                    onClick={() => setOpen(!open)}
                    src={nin}
                    alt=""
                  />
                </div>
              </Link>
            </div>
            {open && !isHidden ? (
              <div className="userInfo">
                <Link className="infoSign" to="/signin">
                  <p>sign in</p>
                </Link>
                <Link className="infoSign" to="/signup">
                  <p>sign up</p>
                </Link>
                <Link to="/signin">
                  <p>Become a medium member</p>
                </Link>
                <Link to="/signin">
                  <p>apply for author verification</p>
                </Link>
              </div>
            ) : (
              <div className="userInfo" style={{ display: "none" }}></div>
            )}
          </>
        )}

        {user && (
          <div className="userProfile">
            <nav className="navka">
              <ul>
                <li>
                  <Link style={{ textDecoration: "none" }} to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link style={{ textDecoration: "none" }} to="/write">
                    Write
                  </Link>
                </li>
                <img
                  className="userImg"
                  src={user._json.avatar_url}
                  onClick={() => setOpen(!open)}
                  alt=""
                />
              </ul>
            </nav>
            {open && !isHidden ? (
              <div className="userInfo">
                <Link style={{ textDecoration: "none" }} to="/profile">
                  <div className="userProfileIcon">
                    <p>Profile</p>
                    <p>
                      <CiUser />
                    </p>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/story">
                  <div className="userStory">
                    <p>Story</p>
                    <p>
                      <HiOutlineChatBubbleOvalLeftEllipsis />
                    </p>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/write">
                  Write
                </Link>
                <Link style={{ textDecoration: "none" }} to="/signin">
                  <p>Become a medium member</p>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/signin">
                  <p>apply for author verification</p>
                </Link>
                <Link style={{ textDecoration: 'none' }} onClick={logout}>
                  logout
                </Link>
              </div>
            ) : (
              <div className="userInfo" style={{ display: "none" }}></div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
