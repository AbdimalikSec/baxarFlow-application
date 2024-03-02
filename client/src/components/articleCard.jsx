import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CiBookmarkPlus } from "react-icons/ci";
/* when i scroll i want a element to be hidden */
import { InputContext } from "../context/context";

const bookCard = ({ name, text, id, category, img, content, user }) => {
  const [addReadList, setAddReadList] = useState(false);
  const { addArticle, removeArticle, articles } = useContext(InputContext);
  const isArticleAdded = articles.some((article) => article.id === id);

  const handleAddingToReadList = (article) => {
    if (isArticleAdded) {
      removeArticle(id);
    } else {
      addArticle({ name, img, id, content, text, category });
    }
  };
  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={`article/${id}`}
        className="articlehaye"
      >
        <div className="article">
          <div>
            <p className="name">{name}</p>
            <p>{category}</p>
            {content && content.length > 0 && (
              <p className="text">{content[0].text}</p>
            )}
            <p className="text">{text}</p>
          </div>
          <img
            src={img}
            className="imgsArticle"
            width={20}
            height={20}
            alt=""
          />
        </div>
      </Link>
      {user ? (
        <Link to="/readlist">
          <CiBookmarkPlus onClick={handleAddingToReadList} className="save" />
        </Link>
      ) : (
        <Link to="/signin">
          <CiBookmarkPlus className="save" />
        </Link>
      )}

      {/* <CiBookmarkPlus
          onClick={() => setAddReadList(!addReadList)}
          className="save"/> */}

      {/*  <div
          className="Modal"
          style={{ display: addReadList ? "block" : "none" }}>
          <p className="modalcontent">Added to Readlist</p>
        </div> */}
    </>
  );
};

export default bookCard;
