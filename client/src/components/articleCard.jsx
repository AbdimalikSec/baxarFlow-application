import React, { useState } from 'react';
import CommentModal from './CommentModal';

const ArticleCard = ({ title, content, img, youtube, link, category, author, authorImg, date, likes, comments }) => {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [articleComments, setArticleComments] = useState(comments || []); // Initialize with passed comments

  const handleLike = () => {
    // Logic to handle likes would go here, potentially updating Firestore
  };

  const handleCommentSubmit = (newComment) => {
    setArticleComments((prevComments) => [
      ...prevComments,
      {
        author: newComment.author,
        authorImg: newComment.authorImg,
        comment: newComment.comment,
      },
    ]);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4 flex">
      <div className="flex-1 mr-4">
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
      />
    </div>
  );
};

export default ArticleCard;