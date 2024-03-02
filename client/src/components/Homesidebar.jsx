import React from "react";
import { nin, nin1, naag, nin3, nin4 } from "../assets/index";
import { forwardRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ChooseCategory from "./ChooseData";
import { InputContext } from "../context/context";

const sidebar = () => {
  const { clickedCategory, AddclickCategory } = useContext(InputContext);

  const handleClickedCategory = (category) => {
    AddclickCategory(category);
  };

  return (
    <div className="DiscoverHome">
      <div className="Discover">
        <h2>Discover what You hope</h2>
        {ChooseCategory.map((category) => (
          <div className="chooseDiscover">
            <div
              onClick={() => handleClickedCategory(category.category)}
              className="chooseCategory"
            >
              <Link to='/eachCategory' style={{ textDecoration: "none" }}>
                <h4>{category.category}</h4>
              </Link>
            </div>
          </div>
        ))}
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
