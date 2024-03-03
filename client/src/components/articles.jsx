import React, { useState, useContext } from "react";
import BookCard from "./articleCard";
import article from "./data";
import { naag, nin } from "../assets";
import { useLocation, Link } from "react-router-dom";
import ReadList from "./ReadList";
import { InputContext } from "../context/context";

const books = () => {
  //const {} = useContext(InputContext);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // Assuming the bookId is part of the URL path

  return (
    <>
      <div className="article-container">
        {article.map((articleItem) => (
          <>
            <BookCard 
            key={articleItem.id} 
            name={articleItem.name}
            category={articleItem.category}
            id={articleItem.id}
            img={articleItem.img}
            text={articleItem.text}
            content={articleItem.content}
            />

          </>
        ))}
      </div>
    </>
  );
};

export default books;

{
  /*   <img src={nin}  alt="" />
        <h2>Baxarflow</h2>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <hr className="hr"/>
        </div> */
}
