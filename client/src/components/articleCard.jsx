import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiBookmarkPlus } from "react-icons/ci";
/* when i scroll i want a element to be hidden */

const bookCard = ({ article }) => {
  return (
    <>
      <Link style={{textDecoration: 'none'}} className="articlehaye" to={`/article/${article.id}`}>
        <div className="article">
          <div>
            <p className="name">{article.name}</p>
            <p>{article.category}</p>
            {article.content && article.content.length > 0 && (
              <p className="text">{article.content[0].text}</p>
            )}
            <p className="text">{article.text}</p>
          </div>
          <img
            src={article.img}
            className="imgsArticle"
            width={20}
            height={20}
            alt=""
          />
        </div>
          <CiBookmarkPlus className="save" />
      </Link>
    </>
  );
};

export default bookCard;
