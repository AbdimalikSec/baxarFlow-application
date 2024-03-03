import React from "react";
import ArticleData from "./data";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { InputContext } from "../context/context";

const ReadList = () => {
  const { articles } = useContext(InputContext);


  return (
    <div className="readList">
      <h1>ReadList</h1>
      {articles.length < 0 && <p>no list</p>}

      {articles.map((article) => (
        <Link
          style={{ textDecoration: "none" }}
          className="articlehaye"
          to={`/article/${article.id}`}>
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
              width={25}
              height={25}
              alt=""
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReadList;
