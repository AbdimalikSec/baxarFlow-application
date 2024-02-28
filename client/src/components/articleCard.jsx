import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiBookmarkPlus } from "react-icons/ci";
/* when i scroll i want a element to be hidden */

const bookCard = ({ article }) => {
  return (
    <>
      <Link className="articlehaye" to={`/article/${article.id}`}>
        <div className="article">
          <div>
            <p className="name">{article.name}</p>
            <img
              src={article.img}
              className="imgsArticle"
              width={20}
              height={20}
              alt=""
            />
            <p>{article.category}</p>
            <p>{article.price}</p>
          </div>
          {article.content && article.content.length > 0 && (
            <p className="text">{article.content[0].text}</p>
          )}
          <p className="text">{article.text}</p>
          <CiBookmarkPlus/>
        </div>
      </Link>
    </>
  );
};

export default bookCard;
