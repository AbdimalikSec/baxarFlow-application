import React from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./userSidebar";
import { useState } from "react";
import ChooseData from "./ChooseData";
import ArticleCard from "./articleCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import article from "./data";
import { InputContext } from "../context/context";
import { useContext } from "react";

const UserChooses = () => {
  const { selectedCategory } = useContext(InputContext);
  const [isSidebarSticky, setIsSidebarSticky] = useState(false);
  let [isSelected, setSelected] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < selectedCategory.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <div className="chooseHaye">
        <h1>UserChooses</h1>
        <div className="userChoses">
          {startIndex > 0 && (
            <FaAngleUp className="UserChoseIcon" onClick={handlePrev} />
          )}
          {selectedCategory
            .slice(startIndex, startIndex + 3)
            .map((category, index) => (
              <div className="chooseOne" key={index}>
                <Link to="/userchooses">
                  <p>{category}</p>
                </Link>
              </div>
            ))}
          {startIndex + 3 < selectedCategory.length && (
            <FaAngleDown className="UserChoseIcon" onClick={handleNext} />
          )}

          <div className="articleUserHaye">
            <div className="articleUser">
              {article.map((articleItem) => (
                <ArticleCard key={articleItem.id} article={articleItem} />
              ))}
            </div>
            <div
              className={`sidebarUser ${
                isSidebarSticky ? "sticky-bottom" : ""
              }`}
            >
              <UserSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChooses;
