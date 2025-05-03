import { createContext, useState, useReducer } from "react";
import Reducer from "./Reducer";

const initialArticles = {
  articles: [], // list of articles
  articlesLength: 0,
};

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(Reducer, initialArticles);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [clickedCategory, setClickedCategory] = useState([]);
  const [generatedTexts, setGeneratedTexts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true); // New

  const addCategory = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory((prev) => [...prev, category]);
    }
  };

  const removeCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.filter((cat) => cat !== category)
    );
  };

  const AddclickCategory = (category) => {
    setClickedCategory(category);
  };

  const addArticle = (article) => {
    dispatch({
      type: "add",
      payload: article,
    });
  };

  const removeArticle = (id) => {
    dispatch({
      type: "remove",
      payload: id,
    });
  };

  const setArticles = (articles) => {
    dispatch({
      type: "set",
      payload: articles,
    });
  };

  return (
    <InputContext.Provider
      value={{
        articles: state.articles,
        articlesLength: state.articles.length,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        removeCategory,
        AddclickCategory,
        clickedCategory,
        addArticle,
        removeArticle,
        setArticles, // Provide setArticles in context
        user,
        setUser,
        setGeneratedTexts,
        generatedTexts,
        loadingUser,
        setLoadingUser, // Expose
      }}
    >
      {children}
    </InputContext.Provider>
  );
};