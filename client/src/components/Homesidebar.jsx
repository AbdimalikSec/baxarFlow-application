import React from "react";
import { nin, nin1, naag, nin3, nin4 } from "../assets/index";
import { forwardRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const sidebar = () => {
  return (
    <div className="DiscoverHome">
      <div className="Discover">
        <h2>Discover what You hope</h2>
        <div className="chooseDiscover">
          <div>programming</div>
          <div>Data science</div>
          <div>Technology</div>
          <div>self-Improvment</div>
          <div>Writing</div>
          <div>Technology</div>
          <div>self-Improvment</div>
          <div>Writing</div>
        </div>
        <Link>
          <p className="seeMore">see more topics</p>
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
