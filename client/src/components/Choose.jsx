import React, { useContext } from "react";
import { InputContext } from "../context/context";

const ChooseCategory = () => {
  const { addCategory, selectedCategory, removeCategory } = useContext(InputContext);
  
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

  // Example categories, replace with dynamic if needed
  const categories = ["Web Security", "Network", "Pentesting", "Tools"];

  return (
    <div className="Choose">
      <h1>Categories</h1>
      <div className="chooseSome">
        {categories.map((category, index) => (
          <div 
            key={index}
            onClick={() => handleChoose(category)}
            className={`cursor-pointer p-2 rounded ${isCategorySelected(category) ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCategory;