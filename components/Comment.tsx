import { useState } from 'react';

import { CommentData } from '@/utils/types';
import Reply from './Reply';
import ReplyForm from './ReplyForm';

interface CommentProps {
  comment: CommentData;
}

const Comment = ({ comment }: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-center mb-2">
        <img src={comment.userImageUrl} alt={comment.username} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h3 className="text-lg font-semibold">{comment.username}</h3>
          <p className="text-gray-700">{comment.commentText}</p>
        </div>
      </div>
      <div className="mb-2">
        <button
          onClick={handleToggleReplies}
          className="text-blue-500 hover:underline"
        >
          {showReplies ? 'Hide Replies' : 'Show Replies'}
        </button>
      </div>
      {showReplies && (
        <div className="ml-4">
          {Object.values(comment.replies || {}).map((reply: any) => (
            <Reply key={reply.id} reply={reply} commentId={comment.id} />
          ))}
          <ReplyForm commentId={comment.id} />
        </div>
      )}
    </div>
  );
};

export default Comment;
