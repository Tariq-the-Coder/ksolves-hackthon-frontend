import React, { useEffect, useState } from 'react';
import { getComments, createComment } from '../services/api';

const CommentList = ({ sessionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getComments(sessionId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(newComment, sessionId);
      setNewComment('');
      // Refresh comments after adding a new one
      const { data } = await getComments(sessionId);
      setComments(data);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentList;
