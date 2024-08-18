import { useState } from 'react';

interface SubReplyFormProps {
  replyId: string;
  commentId: string;
}

const SubReplyForm = ({ replyId, commentId }: SubReplyFormProps) => {
  const [subReplyText, setSubReplyText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/subreplies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyId, commentId, replyText: subReplyText }),
      });
      setSubReplyText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4 bg-white mb-4">
      <textarea
        value={subReplyText}
        onChange={(e) => setSubReplyText(e.target.value)}
        placeholder="Write a sub-reply..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-2 resize-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default SubReplyForm;
