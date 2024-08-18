"use client"
import Comment from '@/components/Comment';
import CommentForm from '@/components/CommentForm';
import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  commentText: string;
  userImageUrl: string;
  replies: Record<string, any>;
  likes: string[];
  userId: string;
  username: string;
  timestamp: { seconds: number; nanoseconds: number };
}

const CommentPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch comments from the API
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comment');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <CommentForm />
      {comments.length === 0 ? (
        <div>No comments available</div>
      ) : (
        comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentPage;

