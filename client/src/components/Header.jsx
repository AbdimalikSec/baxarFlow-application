import React from "react";
import { Link } from "react-router-dom";
import { nin } from "../assets";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Header = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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
        <Link to="/">
          <h1 className="logo">BaxarFlow</h1>
        </Link>
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
                    <FaSearch className="searchIcon" />
                    <input type="text" placeholder="Search" />
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
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/write">Write</Link>
              </li>
              <li>
                <Link>Saacid</Link>
              </li>
              <li>
                <Link onClick={logout}>logout</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Header;
