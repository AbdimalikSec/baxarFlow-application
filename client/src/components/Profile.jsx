import React from "react";
import { useContext, useState, useEffect } from "react";
import { InputContext } from "../context/context";
import UserSidebar from "./userSidebar";
import { nin1 } from "../assets";
import About from "./About";
import SyntaxHighlighter from "react-syntax-highlighter";

const Profile = () => {
  const { user, generatedTexts } = useContext(InputContext);
  const [isAbout, setAbout] = useState(false);
  const [selectedprofileNav, setSelectedprofileNav] = useState(false);

  return (
    <>
      <h1 className="profilename">Profile</h1>
      {!user && (
        <div className="profile">
          <div className="profileNav">
            <p>Home</p>
            {/* home published article
          baa inay yalan la raba */}
            <p>List</p>
            <p onClick={() => setAbout(!isAbout)}>About</p>
          </div>
          <div className="UserProfileEDit">
            <img src={nin1} alt="" />
            <h2>User name</h2>
            <p>edit profile</p>
          </div>
        </div>
      )}
      {user && (
        <div className="profile">
          <div className="profileNav">
            <p>Home</p>
            {/* home published article
          baa inay yalan la raba */}
            <p>List</p>
            <p onClick={() => setAbout(!isAbout)}>About</p>
          </div>
          <div className="UserProfileEDit">
            <img src={user._json.avatar_url} alt="" />
            <h2>{user.displayName}</h2>
            <p>edit profile</p>
          </div>
        </div>
      )}

      {isAbout && <About />}
      {generatedTexts.map((text, index) => (
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
    </>
  );
};

export default Profile;
