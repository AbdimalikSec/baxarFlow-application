import React, { useContext, useEffect } from 'react';
import { InputContext } from '../context/context';
import ArticleCard from './ArticleCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Books = () => {
  const { articles, setArticles, selectedCategory, setGeneratedTexts } = useContext(InputContext);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, 'articles');
        const articlesSnapshot = await getDocs(articlesCollection);
        const articlesList = articlesSnapshot.docs.map(doc => ({
          id: doc.id, // This is the Firestore document ID!
          ...doc.data(),
          comments: doc.data().comments || [], // Ensure comments are included
        }));
        setArticles(articlesList);
        setGeneratedTexts(articlesList); // Update generated texts with fetched articles
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchArticles();
  }, [setArticles, setGeneratedTexts]); // Dependency array to run effect once

  // Filter articles based on selected categories
  const filteredArticles =
  selectedCategory === "All"
    ? articles
    : articles.filter(article => article.category === selectedCategory);



  return (
    <div className="max-w-xl mx-auto mt-4">
      {filteredArticles && filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id} // Pass the Firestore document ID
            title={article.title}
            content={article.content}
            img={article.img} // Use the img URL directly
            youtube={article.youtube}
            link={article.link}
            category={article.category}
            author={article.author}
            authorImg={article.authorImg}
            date={article.date}
            comments={article.comments} // Pass comments
            likes={article.likes} // Pass likes
          />
        ))
      ) : (
        <p>No articles yet.</p>
      )}
    </div>
  );
};

export default Books;