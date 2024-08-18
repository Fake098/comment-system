import { useState } from 'react';

import { ReplyData } from '@/utils/types';
import SubReply from './SubReply';
import SubReplyForm from './SubReplyForm';

interface ReplyProps {
  reply: ReplyData;
  commentId: string;
}

const Reply = ({ reply, commentId }: ReplyProps) => {
  const [showSubReplies, setShowSubReplies] = useState(false);

  const handleToggleSubReplies = () => {
    setShowSubReplies(!showSubReplies);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-center mb-2">
        <img src={reply.userImageUrl} alt={reply.username} className="w-8 h-8 rounded-full mr-3" />
        <div>
          <h4 className="text-md font-semibold">{reply.username}</h4>
          <p className="text-gray-700">{reply.replyText}</p>
        </div>
      </div>
      <div className="mb-2">
        <button
          onClick={handleToggleSubReplies}
          className="text-blue-500 hover:underline"
        >
          {showSubReplies ? 'Hide Sub-replies' : 'Show Sub-replies'}
        </button>
      </div>
      {showSubReplies && (
        <div className="ml-4">
          {Object.values(reply.replies || {}).map((subReply: any) => (
            <SubReply key={subReply.id} subReply={subReply} replyId={reply.id} />
          ))}
          <SubReplyForm replyId={reply.id} commentId={commentId} />
        </div>
      )}
    </div>
  );
};

export default Reply;
