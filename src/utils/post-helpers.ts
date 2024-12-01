import { PostCategory } from '../types/post';

export const getCategoryColor = (category: PostCategory) => {
  switch (category) {
    case 'remedy':
      return 'bg-green-100 text-green-800';
    case 'article':
      return 'bg-blue-100 text-blue-800';
    case 'tip':
      return 'bg-yellow-100 text-yellow-800';
    case 'story':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getCategoryLabel = (category: PostCategory) => {
  switch (category) {
    case 'remedy':
      return 'Community Remedy';
    case 'article':
      return 'Expert Article';
    case 'tip':
      return 'Helpful Tip';
    case 'story':
      return 'Success Story';
    default:
      return category;
  }
};