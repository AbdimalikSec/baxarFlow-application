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
import { useLocation } from "react-router-dom";
// ... other imports

const home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { inputs, user, generatedTexts } = useContext(InputContext); // Access shared data
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
    fetch("http://localhost:5000/sql/logout", {
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
      {/*   {user && <UserChooses />} */}
      <Hero />

      {/* {auth ? (
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
      )} */}

      <Heroafter />
      <div className="homeFlex">
        {user && <UserChooses />}
        {!user && (
          <div>
            <Articles />
          </div>
        )}
        {!user && (
          <div
            className={`sidebarHome ${isSidebarSticky ? "sticky-bottom" : ""}`}
          >
            <Sidebar />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default home;


/* 
{
    "id": "108734287876941176918",
    "displayName": "Cubayd Yuusuf",
    "name": {
        "familyName": "Yuusuf",
        "givenName": "Cubayd"
    },
    "photos": [
        {
            "value": "https://lh3.googleusercontent.com/a/ACg8ocJlawsxyIyse2j_T8zfTGR_U1xaFYVO2-RKS6EAafeobg=s96-c"
        }
    ],
    "provider": "google",
    "_raw": "{\n  \"sub\": \"108734287876941176918\",\n  \"name\": \"Cubayd Yuusuf\",\n  \"given_name\": \"Cubayd\",\n  \"family_name\": \"Yuusuf\",\n  \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJlawsxyIyse2j_T8zfTGR_U1xaFYVO2-RKS6EAafeobg\\u003ds96-c\",\n  \"locale\": \"en\"\n}",
    "_json": {
        "sub": "108734287876941176918",
        "name": "Cubayd Yuusuf",
        "given_name": "Cubayd",
        "family_name": "Yuusuf",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocJlawsxyIyse2j_T8zfTGR_U1xaFYVO2-RKS6EAafeobg=s96-c",
        "locale": "en"
    }
}
*/