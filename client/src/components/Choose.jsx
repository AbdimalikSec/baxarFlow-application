import React, { useContext } from "react";
import { InputContext } from "../context/context";

const ChooseCategory = () => {
  const { selectedCategory, setSelectedCategory } = useContext(InputContext);
  
  const handleChoose = (category) => {
    if (selectedCategory === category) {
      if (category === "All") return; // Don't deselect "All" on second click
      setSelectedCategory("All"); // Revert to "All" if any category clicked again
    } else {
      setSelectedCategory(category); // Select the clicked category
    }
  };
  

  const categories = ["All", "Web Security", "Network", "Pentesting", "Tools"];

  return (
    <div className="Choose">
      <div className="chooseSome flex gap-2 flex-wrap">
        {categories.map((category, index) => (
          <div 
            key={index}
            onClick={() => handleChoose(category)}
            className={`cursor-pointer p-2 rounded-lg text-sm font-semibold transition-all
              ${selectedCategory === category ? "bg-blue-50" : ""}
            `}
          >
            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCategory;
