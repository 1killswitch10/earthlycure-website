import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types/post';
import { useAuth } from '../contexts/AuthContext';
import { postService } from '../services/postService';
import { getCategoryColor, getCategoryLabel } from '../utils/post-helpers';

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const fetchedPost = await postService.getPost(parseInt(id));
      setPost(fetchedPost);
    } catch (err) {
      setError('Failed to load post. Please try again later.');
      console.error('Error loading post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post || !isAuthenticated) return;

    try {
      if (post.isLiked) {
        await postService.unlikePost(post.id);
      } else {
        await postService.likePost(post.id);
      }

      setPost(currentPost => {
        if (!currentPost) return null;
        return {
          ...currentPost,
          likes: currentPost.isLiked ? currentPost.likes - 1 : currentPost.likes + 1,
          isLiked: !currentPost.isLiked
        };
      });
    } catch (err) {
      console.error('Error updating like:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Post not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/posts" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
          >
            ← Back to Posts
          </Link>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                  {getCategoryLabel(post.category)}
                </span>
                <div className="text-gray-500 text-sm">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center mb-6">
                <span className="text-gray-600">By {post.author}</span>
              </div>

              <div className="prose prose-green max-w-none mb-6">
                {post.content}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      disabled={!isAuthenticated}
                      className={`flex items-center space-x-1 text-sm ${
                        post.isLiked ? 'text-green-600' : 'text-gray-500'
                      } hover:text-green-600 transition-colors focus:outline-none disabled:opacity-50`}
                    >
                      <span>{post.isLiked ? '❤️' : '👍'}</span>
                      <span>{post.likes}</span>
                    </button>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{post.comments} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostView;