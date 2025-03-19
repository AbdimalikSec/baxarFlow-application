import React from "react";
import { mustafa } from "../assets/index";
import { forwardRef } from "react";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { InputContext } from "../context/context";
import UserSidebar from "./userSidebar";

const sidebar = () => {
  const { clickedCategory, user, AddclickCategory } = useContext(InputContext);

  const handleClickedCategory = (category) => {
    AddclickCategory(category);
  };

  return user ? (
    <UserSidebar />
  ) : (
    <div className="DiscoverHome">
      <div className="Discover">
        <img src={mustafa} alt="" />
        <h2 className="font-bold">cyberHack | Community</h2>
        <p>CyberHack.com</p>
        <Link>
          <p className="seeMore">Break into Cybersecurity with Training, Hands-On Projects and a Career Pathway Call - Did we say this is free?
          </p>
          <p>START HERE</p>
        </Link>
      </div>
      <div className="footerSidebar">
        <p>5k members</p>
        <p>17 online</p>
        <p>5 admins</p>
      </div>
    </div>
  );
};

export default sidebar;


