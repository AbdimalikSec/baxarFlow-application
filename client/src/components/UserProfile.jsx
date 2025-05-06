import React, { useEffect, useState, useContext } from "react";
import { InputContext } from "../context/context";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ArticleCard from "./ArticleCard"; // Ensure correct case for the import
import Spinner from "./Spinner";

const UserProfile = () => {
  const { user } = useContext(InputContext);
  const [articles, setArticles] = useState([]);
  const { loadingUser } = useContext(InputContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (user && user.uid) {
        // Check if user and uid are defined
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(userArticles);
        console.log(userArticles);
        console.log(user);
      }
      setLoading(false); // Done loading regardless of user
    };

    fetchUserArticles();
  }, [user]);

  if (loading || loadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="ml-[500px] max-w-7xl mx-auto flex flex-col gap-10">
      {/* Articles Box */}
      <br />
      <div className="flex justify-center gap-[400px] mb-20">
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles found.</p>
        )}

        {/* User Info Box (Right) */}
        <div className="w-100 bg-white p-6 rounded-3xl shadow-lg border text-gray-700 mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Account Details
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src={user.photoURL}
              alt="User"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
          </div>
          <div className="space-y-3 text-center">
            <p>
              <span className="font-semibold">Name:</span> {user.displayName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              {user.role || "Member"}
            </p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default UserProfile;
