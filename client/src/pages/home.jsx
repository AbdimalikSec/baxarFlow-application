import React, { useState, useEffect, useContext } from "react";
import Articles from "../components/articles";
import Sidebar from "../components/Homesidebar";
import Footer from "../components/footer";
import Hero from "../components/Hero";
import Heroafter from "../components/HeroNext";
import { InputContext } from "../context/context";
import SyntaxHighlighter from "react-syntax-highlighter";
import axios from "axios";
import { Link } from "react-router-dom";
import UserChooses from "../components/UserChooses";
// ... other imports

const home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { inputs, user } = useContext(InputContext); // Access shared data
  const [isSidebarSticky, setIsSidebarSticky] = useState(false);

  // No changes needed in render function, as it already displays published texts.

  useEffect(() => {
    fetch("http://localhost:5000/sql/verify", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAuth(true);
          setName(data.name);
        } else {
          setAuth(false);
          setMessage(data.message);
        }
      });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/sql/logout",{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.reload();
        } else {
          console.log("logout error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user && <UserChooses />}
      <Hero />
      {auth ? (
        <div>
          you are authorized {name}
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/signin">
            <p>{message}</p>
            <button className="login">Login</button>
          </Link>
        </div>
      )}
      <Heroafter />
      <div className="homeFlex">
        <div>
          <Articles />
        </div>
        <div
          className={`sidebarHome ${isSidebarSticky ? "sticky-bottom" : ""}`}
        >
          <Sidebar />
        </div>
      </div>
      {/* Display published texts without input elements */}
      <div className="HomeGeneratedArray">
        {inputs.map((text, index) => (
          <div key={index} className="singleInputGenerated">
            {text.type === "code" ? (
              <SyntaxHighlighter language="javascript">
                {text.content}
              </SyntaxHighlighter>
            ) : (
              <span>{text.content}</span>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default home;
