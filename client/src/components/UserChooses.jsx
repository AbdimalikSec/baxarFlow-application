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
  const [startIndex, setStartIndex] = useState(0);
  const [isTouched, setIstouched] = useState(false);
  const [touchedCategoryIndex, setTouchedCategoryIndex] = useState(0);

  /*   const filterCategoryByChoosed = article.filter((article) => {
    if (selectedCategory.includes(article.category)) {
      return article;
    }
  }); */
  

  const filteredCategoryByChoosed =
    touchedCategoryIndex !== null
      ? article.filter(
          (article) =>
            article.category === selectedCategory[touchedCategoryIndex]
        )
      : [];

  const handleNext = () => {
    if (startIndex < filteredCategoryByChoosed.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  /*   const handleNext = () => {
    if (startIndex < selectedCategory.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  }; */

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
            .map((category, index) => {
              return (
                <div className="chooseOne" key={index}>
                  <p
                    key={index}
                    className={touchedCategoryIndex === index ? "red" : ""}
                    onClick={() => setTouchedCategoryIndex(index)}
                  >
                    {category}
                  </p>
                </div>
              );
            })}
          {startIndex + 3 < selectedCategory.length && (
            <FaAngleDown className="UserChoseIcon" onClick={handleNext} />
          )}

          <div className="articleUserHaye">
            <div className="articleUser">
              {filteredCategoryByChoosed.map((articleItem) => (
                <ArticleCard
                  key={articleItem.id}
                  name={articleItem.name}
                  img={articleItem.img}
                  category={articleItem.category}
                  id={articleItem.id}
                  text={articleItem.text}
                  content={articleItem.content}
                  article={articleItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChooses;
