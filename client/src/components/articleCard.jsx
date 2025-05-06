import React, { useState, useContext, useEffect } from "react";
import CommentModal from "./CommentModal";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { InputContext } from "../context/context";
import { db } from "../firebase";
import ArticleDetailModal from "./ArticleDetailModal";
const ArticleCard = ({
  id, // Firestore Document ID
  title,
  content,
  img,
  youtube,
  link,
  category,
  author,
  authorImg,
  date,
  likes, // This will now be an array of user IDs
  comments,
}) => {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [articleComments, setArticleComments] = useState(comments || []);
  const { user } = useContext(InputContext);
  const [hasLiked, setHasLiked] = useState(false); // Track if the current user has liked the article
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0); // Initialize like count
  const [isDetailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (user && likes && Array.isArray(likes) && likes.includes(user.uid)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [user, likes]);

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like this article.");
      return;
    }

    const articleRef = doc(db, "articles", id);

    try {
      const articleSnap = await getDoc(articleRef);
      if (!articleSnap.exists()) {
        console.error("No such document for likes!");
        return;
      }

      const articleData = articleSnap.data();
      let updatedLikes = articleData.likes;

      if (!Array.isArray(updatedLikes)) {
        updatedLikes = [];
      }

      if (hasLiked) {
        updatedLikes = updatedLikes.filter((userId) => userId !== user.uid);
        setHasLiked(false);
      } else {
        updatedLikes.push(user.uid);
        setHasLiked(true);
      }

      await updateDoc(articleRef, { likes: updatedLikes });
      setLikeCount(updatedLikes.length);
      console.log("Likes updated successfully!");
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleCommentSubmit = async (newComment) => {
    const updatedComments = [...articleComments, newComment];
    setArticleComments(updatedComments);

    const articleRef = doc(db, "articles", id);

    try {
      await updateDoc(articleRef, {
        comments: updatedComments,
      });
      console.log("Comment submitted successfully!");
    } catch (error) {
      console.error("Error saving comment: ", error);
    }
  };

  const handleRemove = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this article?"
    );
    if (!confirmDelete) return;

    try {
      const articleRef = doc(db, "articles", id);
      await deleteDoc(articleRef); // Hard delete. Replace with updateDoc({deleted: true}) if soft-delete needed
      console.log("Article removed successfully.");
    } catch (error) {
      console.error("Error removing article:", error);
    }
  };

  const canRemove = user && user.role === "admin"; // author is user.uid of the one who posted

  return (
    <>
      <div
        onClick={() => setDetailOpen(true)}
        className="articleCardBox  rounded-lg shadow-md flex items-start w-[140%]"
      >
        {/* Left section */}
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <img
              src={`${authorImg}?${Date.now()}`}
              alt={author}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-xs text-gray-500">
                By {author} on {date}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-3">{content}</p>
          {youtube && (
            <p className="text-sm text-blue-500 mb-1">
              YouTube:
              <a href={youtube} target="_blank" rel="noopener noreferrer">
                {youtube}
              </a>
            </p>
          )}
          {link && (
            <p className="text-sm text-blue-500 mb-1">
              Link:
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </p>
          )}
          {category && (
            <p className="text-sm text-green-500">Category: {category}</p>
          )}

          <div className="flex space-x-4 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the parent div's click from firing
                handleLike();
              }}
              className={`text-blue-500 cursor ${hasLiked ? "font-semibold" : ""}`}
            >
              {hasLiked ? "Unlike" : "Like"} {likeCount > 0 && `(${likeCount})`}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the parent div's click from firing
                setCommentModalOpen(true);
              }}
              className="text-blue-500"
            >
              Comment
            </button>
          </div>
          {canRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the parent div's click from firing
                handleRemove();
              }}
              className="text-red-500 cursor"
            >
              Remove
            </button>
          )}
        </div>

        {/* Right image */}
        <div>
          {img && (
            <div className="ml-6 flex-shrink-0  p-[200px]">
              <img
                src={img}
                alt="Attached"
                className="w-32 h-32 object-cover rounded border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        onSubmit={handleCommentSubmit}
        article={{ title, content, author, authorImg }}
        comments={articleComments}
        articleId={id}
      />
      <ArticleDetailModal
        isOpen={isDetailOpen}
        onClose={() => setDetailOpen(false)}
        article={{
          id,
          title,
          content,
          img,
          youtube,
          link,
          category,
          author,
          authorImg,
          date,
          likes,
          comments,
        }}
      />
    </>
  );
};

export default ArticleCard;
