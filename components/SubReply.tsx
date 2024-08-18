import { ReplyOfReplyData } from '@/utils/types';

interface SubReplyProps {
  subReply: ReplyOfReplyData;
  replyId: string;
}

const SubReply = ({ subReply, replyId }: SubReplyProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-center mb-2">
        <img src={subReply.userImageUrl} alt={subReply.username} className="w-6 h-6 rounded-full mr-3" />
        <div>
          <h5 className="text-sm font-semibold">{subReply.username}</h5>
          <p className="text-gray-700">{subReply.replyText}</p>
        </div>
      </div>
    </div>
  );
};

export default SubReply;
