import React from "react";
import { nin, nin1, naag, nin3, nin4 } from "../assets/index";
import { forwardRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const sidebar = () => {
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
        <div className="member">
          <div className="singleMember">
            <img src={nin} alt="nin" />
            <p>saacid</p>
            <FaEllipsisH className="dot"/>
          </div>
          <div className="singleMember">
            <img src={nin1} alt="nin1" />
            <p>cali</p>
            <FaEllipsisH className="dot"/>
          </div>
          <div className="singleMember">
            <img src={naag} alt="naag" />
            <p>cumar</p>
            <FaEllipsisH  className="dot"/>
          </div>
          <Link>
            <p className="seeall">seeAll(18)</p>
          </Link>
        </div>
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
