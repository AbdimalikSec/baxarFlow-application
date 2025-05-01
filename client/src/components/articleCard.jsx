import React, { useState, useContext } from 'react';
import CommentModal from './CommentModal';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { InputContext } from '../context/context';
import { db } from '../firebase';

const ArticleCard = ({ id, title, content, img, youtube, link, category, author, authorImg, date, likes, comments }) => {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [articleComments, setArticleComments] = useState(comments || []);
  const { user } = useContext(InputContext);

  const handleLike = async () => {
    const articleRef = doc(db, "articles", id);
    console.log("Trying to like article with ID:", id);

    try {
      const articleSnap = await getDoc(articleRef);
      if (!articleSnap.exists()) {
        console.error("No such document for likes!");
        return;
      }

      const updatedLikes = articleSnap.data().likes + 1;
      await updateDoc(articleRef, { likes: updatedLikes });
      console.log("Likes updated successfully!");
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleCommentSubmit = async (newComment) => {
    const updatedComments = [...articleComments, newComment];
    setArticleComments(updatedComments);

    const articleRef = doc(db, "articles", id);
    console.log("Trying to submit comment to article ID:", id);

    try {
      const articleSnap = await getDoc(articleRef);
      if (!articleSnap.exists()) {
        console.error("No such document for comments!");
        return;
      }

      await updateDoc(articleRef, {
        comments: updatedComments,
      });
      console.log("Comment submitted successfully!");
    } catch (error) {
      console.error("Error saving comment: ", error);
    }
  };

  return (
    <>
<div className="articleCardBox border rounded-lg p-4 shadow-md mb-4 flex items-start">
  {/* Left section */}
  <div className="flex-1">
    <div className="flex items-center mb-3">
      <img src={authorImg} alt={author} className="w-12 h-12 rounded-full mr-3" />
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-xs text-gray-500">By {author} on {date}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-3">{content}</p>
    {youtube && (
      <p className="text-sm text-blue-500 mb-1">
        YouTube: <a href={youtube} target="_blank" rel="noopener noreferrer">{youtube}</a>
      </p>
    )}
    {link && (
      <p className="text-sm text-blue-500 mb-1">
        Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      </p>
    )}
    {category && <p className="text-sm text-green-500">Category: {category}</p>}

    <div className="flex space-x-4 mt-2">
      <button onClick={handleLike} className="text-blue-500">
        Like {likes > 0 && `(${likes})`}
      </button>
      <button onClick={() => setCommentModalOpen(true)} className="text-blue-500">
        Comment
      </button>
    </div>
  </div>

  {/* Right image */}
  {img && (
    <div className="ml-6 flex-shrink-0">
      <img
        src={img}
        alt="Attached"
        className="w-32 h-32 object-cover rounded border border-gray-200"
      />
    </div>
  )}
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
    </>
  );
};

export default ArticleCard;
