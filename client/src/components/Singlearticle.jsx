import React from "react";
import articles from "./data";
import { useParams,Link } from "react-router-dom";
import Reactsyntaxhighlighter from "react-syntax-highlighter";
import { IoMdArrowBack } from "react-icons/io";

const Singlearticle = () => {
  const { id } = useParams();

  // Find the article with the matching ID
  const article = articles.find((article) => article.id === parseInt(id));

  return (
    <>
      <div className="singleArticle">
        <Link to='/'>
        <IoMdArrowBack/>
        </Link>
        <h2> {article.name}</h2>
        <img src={article.img} alt={article.name} />
        {article.content.map((contentItem, index) => {
          if (contentItem.type === "text") {
            return <p key={index}>{contentItem.text}</p>;
          }
          if (contentItem.type === "code") {
            return (
              <div className="highlighter" key={index}>
                <Reactsyntaxhighlighter>
                  {contentItem.code}
                </Reactsyntaxhighlighter>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default Singlearticle;

/* 
<sytext
{`function(){
    return "hello world";
}`}

</sytext>

*/
