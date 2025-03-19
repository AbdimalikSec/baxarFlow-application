const Reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    case "remove":
      return {
        ...state,
        articles: state.articles.filter(article => article.id !== action.payload),
      };
    case "set":
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;