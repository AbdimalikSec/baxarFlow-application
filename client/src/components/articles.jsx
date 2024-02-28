import React, { useState } from "react";
import BookCard from "./articleCard";
import article from "./data";
import { naag, nin } from "../assets";
import { useLocation, Link } from "react-router-dom";

const books = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2]; // Assuming the bookId is part of the URL path
  return (
    <>
      <div className="article-container">
        {article.map((articleItem) => (
          <BookCard key={articleItem.id} article={articleItem} />
        ))}
      </div>
    </>
  );
};

export default books;




  {/*   <img src={nin}  alt="" />
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
        </div> */}