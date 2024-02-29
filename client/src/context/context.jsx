import React, { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [inputs, setInputs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const addInput = (text) => {
    setInputs((prevInputs) => [...prevInputs, text]);
  };

  const addCategory = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory((prevCategory) => [...prevCategory, category]);
    }
  };

  const removeCategory = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory.filter((selectedCat) => selectedCat !== category)
    );
  };

  return (
    <InputContext.Provider
      value={{
        inputs,
        addInput,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        removeCategory,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
