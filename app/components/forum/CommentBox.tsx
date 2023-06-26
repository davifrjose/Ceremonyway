import React from 'react';

interface CommentBoxProps {
  createdAt: string;
  text: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ createdAt, text }) => {
  return (
    <div>
      {/* Comment content */}
      <p>{text}</p>
      {/* Comment metadata */}
      <p>Created at: {createdAt}</p>
    </div>
  );
};

export default CommentBox;
