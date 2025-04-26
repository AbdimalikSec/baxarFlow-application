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
    const articleRef = doc(db, "articles", id); // Reference to the article document
    console.log("Trying to like article with ID:", id); // Debugging log

    try {
      const articleSnap = await getDoc(articleRef);
      if (!articleSnap.exists()) {
        console.error("No such document for likes!");
        return; // Document doesn't exist
      }

      const updatedLikes = articleSnap.data().likes + 1; // Increment the current likes
      await updateDoc(articleRef, { likes: updatedLikes }); // Update likes in Firestore
      console.log("Likes updated successfully!"); // Debugging log
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleCommentSubmit = async (newComment) => {
    const updatedComments = [...articleComments, newComment];
    setArticleComments(updatedComments);

    const articleRef = doc(db, "articles", id);
    console.log("Trying to submit comment to article ID:", id); // Debugging log

    try {
      const articleSnap = await getDoc(articleRef);
      if (!articleSnap.exists()) {
        console.error("No such document for comments!");
        return; // Document doesn't exist
      }

      await updateDoc(articleRef, {
        comments: updatedComments, // Update comments in Firestore
      });
      console.log("Comment submitted successfully!"); // Debugging log
    } catch (error) {
      console.error("Error saving comment: ", error);
    }
  };

  return (
    <div className="articleCardBox border rounded-lg p-4 shadow-md mb-4 flex">
      <div className="eachatricle  flex-1 mr-4">
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
      {img && (
        <img src={img} alt="Attached" className="w-32 h-32 object-cover rounded border border-gray-200 ml-4" />
      )}

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        onSubmit={handleCommentSubmit}
        article={{ title, content, author, authorImg }} // Pass article info to modal
        comments={articleComments} // Pass updated comments to modal
        articleId={id} // Pass the article ID to the modal
      />
    </div>
  );
};

export default ArticleCard;