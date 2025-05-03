import React, { useContext, useEffect, useState } from "react";

import { InputContext } from "../context/context";

import ArticleCard from "./ArticleCard";

import { db } from "../firebase";

import { collection, getDocs } from "firebase/firestore";

const Books = () => {
  const { articles, setArticles, selectedCategory, setGeneratedTexts } =
    useContext(InputContext);

  const [loading, setLoading] = useState(true); // ⬅️ Add loading state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, "articles");

        const articlesSnapshot = await getDocs(articlesCollection);

        const articlesList = articlesSnapshot.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),

          comments: doc.data().comments || [],
        }));

        setArticles(articlesList);

        setGeneratedTexts(articlesList);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false); // ✅ Mark loading as complete
      }
    };

    fetchArticles();
  }, [setArticles, setGeneratedTexts]);

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="max-w-xl mx-auto mt-4">
           {" "}
      {loading ? (
        <div className="flex justify-center items-center h-48">
                   {" "}
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                 {" "}
        </div>
      ) : filteredArticles && filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            content={article.content}
            img={article.img}
            youtube={article.youtube}
            link={article.link}
            category={article.category}
            author={article.author}
            authorImg={article.authorImg}
            date={article.date}
            comments={article.comments}
            likes={article.likes}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          No articles available in this category.
        </p>
      )}
         {" "}
    </div>
  );
};

export default Books;
