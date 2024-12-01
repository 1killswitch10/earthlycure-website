import React, { useState } from 'react';
import { PostCategory } from '../types/post';

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; category: PostCategory; content: string }) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'remedy' as PostCategory,
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as PostCategory })}
            >
              <option value="remedy">Community Remedy</option>
              <option value="story">Success Story</option>
              <option value="tip">Helpful Tip</option>
              <option value="article">Expert Article</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Share Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};