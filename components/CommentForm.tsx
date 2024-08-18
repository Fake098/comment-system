import { useState } from 'react';

const CommentForm = () => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentText }),
      });
      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4 bg-white mb-4">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-2 resize-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
