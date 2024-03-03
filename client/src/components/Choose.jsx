import React from "react";
import { Link } from "react-router-dom";
import ChooseData from "./ChooseData";
import { InputContext } from "../context/context";
import { useContext } from "react";

const Choose = () => {
  const { addCategory, selectedCategory, removeCategory } =
    useContext(InputContext);

  const handleChoose = (category) => {
    if (isCategorySelected(category)) {
      removeCategory(category);
    } else {
      addCategory(category);
    }
  };

  const isCategorySelected = (category) => {
    return selectedCategory.includes(category);
  };

  return (
    <div className="Choose">
      <h1>Discover your world</h1>
      <div className="chooseSome">
        {ChooseData.map((chosed, index) => (
          <div 
            key={index}
            onClick={() => handleChoose(chosed.category)}
            className={isCategorySelected(chosed.category) ? "selected" : ""}
          >
            <p>{chosed.category}</p>
          </div>
        ))}
      </div>
      <Link to="/userChooses" className="seeMore">
        continue
      </Link>
    </div>
  );
};

export default Choose;
