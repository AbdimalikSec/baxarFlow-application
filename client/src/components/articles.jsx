import React from "react";
import article from "./data";
import BookCard from "./articleCard";
import { useLocation } from "react-router-dom";

const books = () => {
  const location = useLocation();
  /*     const path = location.pathname.split('/'[2])
    const filterBooks = book.filter(book => book.category === path)
    const singlebook = book.find((b) => b.id.toString() === path)  */

  return (
    <>
      <div className="article-container">
        {article.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </>
  );
};

export default books;
