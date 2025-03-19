import React, { useContext, useEffect } from 'react';
import { InputContext } from '../context/context';
import ArticleCard from './ArticleCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Books = () => {
  const { articles, setArticles, selectedCategory } = useContext(InputContext);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(db, 'articles');
      const articlesSnapshot = await getDocs(articlesCollection);
      const articlesList = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(articlesList);
    };

    fetchArticles();
  }, [setArticles]);

  // Filter articles based on selected categories
  const filteredArticles = selectedCategory.length
    ? articles.filter(article => selectedCategory.includes(article.category))
    : articles;

  return (
    <div className="max-w-xl mx-auto mt-4">
      {filteredArticles && filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
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