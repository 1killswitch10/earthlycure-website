import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { getCategoryColor, getCategoryLabel } from '../utils/post-helpers';

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
            {getCategoryLabel(post.category)}
          </span>
          <div className="text-gray-500 text-sm">
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>

        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              By {post.author}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                onLike(post.id);
              }}
              className={`flex items-center space-x-1 text-sm ${
                post.isLiked ? 'text-green-600' : 'text-gray-500'
              } hover:text-green-600 transition-colors focus:outline-none`}
            >
              <span>{post.isLiked ? '❤️' : '👍'}</span>
              <span>{post.likes}</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onComment(post.id);
              }}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600 transition-colors focus:outline-none"
            >
              <span>💬</span>
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};