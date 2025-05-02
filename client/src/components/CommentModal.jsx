import React, { useState, useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { InputContext } from '../context/context';
import { db } from '../firebase';

const CommentModal = ({ isOpen, onClose, onSubmit, article, comments, articleId }) => {
  const [comment, setComment] = useState('');
  const { user } = useContext(InputContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        author: user.displayName,
        authorImg: user.photoURL,
        comment,
      };

      const articleRef = doc(db, "articles", articleId); // Use the Firestore ID
      console.log("Trying to submit comment to article ID:", articleId); // Debugging log

      try {
        //const articleSnap = await getDoc(articleRef); //No need to get doc just to update comments
        //if (!articleSnap.exists()) {
        //  console.error("No such document for comments!");
        //  return; // Handle the case where the document does not exist
        //}

        const updatedComments = [...comments, newComment]; // Use the comments passed as props
        await updateDoc(articleRef, {
          comments: updatedComments,
        });

        onSubmit(newComment); // Pass the new comment to the parent component
        setComment(''); // Clear the input after submission
        onClose(); // Close the modal
      } catch (error) {
        console.error("Error saving comment: ", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6">
        {/* Article Info */}
        <div className="flex items-center space-x-3">
          <img src={article.authorImg} alt={article.author} className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p className="text-sm text-gray-500">By {article.author} on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <p className="text-gray-700">{article.content}</p>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment..."
            className="border rounded-lg p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <div className="flex justify-end space-x-3">
            <button type="button" className="text-red-500 hover:underline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>

        {/* Display Comments */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3 mb-2">
                  <img src={comment.authorImg} alt={comment.author} className="w-8 h-8 rounded-full" />
                  <p className="font-semibold">{comment.author || 'Anonymous'}</p>
                </div>
                <p className="text-gray-600">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;