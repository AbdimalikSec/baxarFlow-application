import React from "react";
import { useContext } from "react";
import { InputContext } from "../context/context";

const EachCategory = () => {
    const {clickedCategory} = useContext(InputContext)
  return (
    <div className="eachCategory">
      <h1>{clickedCategory}</h1>
    </div>
  );
};

export default EachCategory;
