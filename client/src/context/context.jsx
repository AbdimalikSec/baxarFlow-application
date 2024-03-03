import { createContext, useState, useReducer } from "react";
import Reducer from "./Reducer";

const intialArticles = {
  articles: [],
  articlesLength: 0,
};

export const InputContext = createContext();

//  const isItemAdded = dharbadan.some((item) => item.id === id);
export const InputProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [article, SetArticle] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [state, dispatch] = useReducer(Reducer, intialArticles);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [clickedCategory, setClickedCategory] = useState("");

  const addInput = (text) => {
    setInputs((prevInputs) => [...prevInputs, text]);
  };

  const addCategory = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory((prevCategory) => [...prevCategory, category]);
    }
  };

  const AddclickCategory = (category) => {
    setClickedCategory((prevCategory) => [...prevCategory, category]);
  };

  const removeCategory = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory.filter((selectedCat) => selectedCat !== category)
    );
  };

  const addArticle = (articles) => {
    dispatch({
      type: "add",
      payload: articles,
    });
  };

  const removeArticle = (id) => {
    dispatch({
      type: "remove",
      payload: id,
    });
  };

  return (
    <InputContext.Provider
      value={{
        articles: state.articles,
        articlesLength: state.articles.length,
        inputs,
        addInput,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        removeCategory,
        AddclickCategory,
        clickedCategory,
        addArticle,
        removeArticle,
        user,
        setUser
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
