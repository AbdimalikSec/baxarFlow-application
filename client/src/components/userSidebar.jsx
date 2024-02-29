import React, { useState } from "react";
import { nin, nin1, naag, nin3, nin4 } from "../assets/index";
import { forwardRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import Members from "./membersData";

const sidebar = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleUserNoteToggle = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };
  return (
    <div>
      <div>
        <img src={nin} className="sidebarNin" alt="" />
        <h3>baxarFlow</h3>
        <span>17Followers</span>
      </div>
      <div className="icons">
        <p>Follow</p>
        <p>
          <MdOutlineAttachEmail className="emailIcon" />
        </p>
      </div>
      <div className="members">
        <h4>following</h4>
        {Members.map((mem) => (
          <>
            <div className="member" key={mem.id} id={mem.id}>
              <div key={mem.id} className="singleMember">
                <img src={mem.img} alt="nin" />
                <p>{mem.name}</p>
                <FaEllipsisH
                  onClick={() => handleUserNoteToggle(mem.id)}
                  className="dot"
                />
                {selectedUserId === mem.id &&(
                  <div id={mem.id} className="userNote">
                    {mem.text}
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
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
