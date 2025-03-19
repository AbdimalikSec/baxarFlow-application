import React, { useState, useContext } from "react";
import { forwardRef } from "react";
import { nin } from "../assets";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { InputContext } from "../context/context";

const sidebar = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { user } = useContext(InputContext);
  const handleUserNoteToggle = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  return (
    <div>
      <div>
        {user && (
          <>
            <img src={user.photoURL || nin} className="sidebarNin" alt="" />
            <h3>{user.displayName}</h3>
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
      <div className="icons">
        <p>Follow</p>
        <p>
          <MdOutlineAttachEmail className="emailIcon" />
        </p>
      </div>
      <div className="members">
        <h4>Memebers</h4>
        <Link>
          <p className="seeall">seeAll(18)</p>
        </Link>
      </div>
      <div className="footerSidebar">
        <p>status</p>
        <p>privacy</p>
        <p>about</p>
        <p>careers</p>
        <p>Blog</p>
      </div>
    </div>
  );
};

export default sidebar;
