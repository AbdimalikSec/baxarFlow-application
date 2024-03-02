export default (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    case "remove":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload
        ),
      };
    default: {
      return state;
    }
  }
};
