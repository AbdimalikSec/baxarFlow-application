import React from "react";
import { useContext } from "react";
import { InputContext } from "../context/context";
import Data from "./data";
import ArticleCard from './articleCard'

const EachCategory = () => {
  const { clickedCategory } = useContext(InputContext);

  let filterSameCategory = Data.filter((data) => {
    if (clickedCategory.includes(data.category)) {
      console.log(data)
      return data;
    };
  });
  console.log(filterSameCategory)


  return (
    <div className="eachCategory">
      <h1>{clickedCategory}</h1>
      {filterSameCategory.map((articleItem) => {
        <div>
          <h1>{articleItem.name}</h1>
          <img src={articleItem.img} alt="" />
        </div>
      })}
    </div>
  );
};

export default EachCategory;
