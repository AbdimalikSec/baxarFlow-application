import React from "react";
import { Link } from "react-router-dom";

const bookCard = ({ book }) => {
  return (
    <Link className="articlehaye" to={`/article/${book.id}`} >
      <div className="article">
        <div>
          <p className="name">{book.name}</p>
          <img src={book.img} className="imgsArticle" width={20} height={20}  alt="" />
          <p>{book.category}</p>
          <p>{book.price}</p>
        </div>
        <p className="text">{book.text}</p>
      </div>
    </Link>
  );
};

export default bookCard;
