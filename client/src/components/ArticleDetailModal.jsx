import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { InputContext } from "../context/context";
import { db } from "../firebase";

const ArticleDetailModal = ({ isOpen, onClose, article }) => {
  const { user } = useContext(InputContext);
  const [likes, setLikes] = useState(article.likes || []);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(article.comments || []);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setHasLiked(user && likes.includes(user.uid));
  }, [user, likes]);

  const handleLike = async () => {
    if (!user) return alert("Login to like");

    const articleRef = doc(db, "articles", article.id);
    let updatedLikes = [...likes];

    if (hasLiked) {
      updatedLikes = updatedLikes.filter((uid) => uid !== user.uid);
    } else {
      updatedLikes.push(user.uid);
    }

    await updateDoc(articleRef, { likes: updatedLikes });
    setLikes(updatedLikes);
    setHasLiked(!hasLiked);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const newEntry = {
      text: newComment,
      author: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [...comments, newEntry];
    setComments(updatedComments);
    setNewComment("");

    await updateDoc(doc(db, "articles", article.id), {
      comments: updatedComments,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg relative z-[10000]"
       onClick={(e) => e.stopPropagation()}>
        <button className="text-red-500 mb-4" onClick={onClose}>
          Close
        </button>

        <div className="flex items-center mb-3">
          <img
            src={`${article.authorImg}?${Date.now()}`}
            alt=""
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <h2 className="foXnt-bold text-lg">{article.title}</h2>
            <p className="text-xs text-gray-500">
              By {article.author} • {article.date}
            </p>
          </div>
        </div>

        {article.img && (
          <img
            src={article.img}
            alt=""
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        )}

        <p className="mb-3 text-gray-800">{article.content}</p>

        {article.youtube && (
          <a
            href={article.youtube}
            className="text-blue-500 block mb-1"
            target="_blank"
          >
            YouTube Link
          </a>
        )}

        {article.link && (
          <a
            href={article.link}
            className="text-blue-500 block mb-1"
            target="_blank"
          >
            External Link
          </a>
        )}

        <p className="text-sm text-green-600">Category: {article.category}</p>

        <div className="flex items-center gap-4 my-4">
          <button onClick={handleLike} className="text-blue-600 font-semibold">
            {hasLiked ? "Unlike" : "Like"} ({likes.length})
          </button>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          >
            Submit Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Comments ({comments.length})</h3>
          {comments.map((c, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-start">
              <img
                src={c.photoURL || "https://via.placeholder.com/30"}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{c.author}</p>
                <p className="text-xs text-gray-600">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;
