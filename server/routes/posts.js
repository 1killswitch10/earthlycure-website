import express from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Keyon_4417498',
  database: 'earthly_cure',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware to extract user from token if present
const getUserFromToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  next();
};

// Get all posts
router.get('/', getUserFromToken, async (req, res) => {
  try {
    const [posts] = await pool.execute(`
      SELECT 
        p.*,
        u.firstname as author_firstname,
        u.lastname as author_lastname,
        CASE WHEN pl.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.userID
      LEFT JOIN post_likes pl ON p.id = pl.post_id AND pl.user_id = ?
      ORDER BY p.created_at DESC
    `, [req.user?.userId || null]);

    res.json(posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: `${post.author_firstname} ${post.author_lastname}`,
      isLiked: !!post.is_liked,
      date: post.created_at,
      category: post.category,
      likes: post.likes,
      comments: post.comments
    })));
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', getUserFromToken, async (req, res) => {
  try {
    const [posts] = await pool.execute(`
      SELECT 
        p.*,
        u.firstname as author_firstname,
        u.lastname as author_lastname,
        CASE WHEN pl.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.userID
      LEFT JOIN post_likes pl ON p.id = pl.post_id AND pl.user_id = ?
      WHERE p.id = ?
    `, [req.user?.userId || null, req.params.id]);

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = posts[0];
    res.json({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: `${post.author_firstname} ${post.author_lastname}`,
      isLiked: !!post.is_liked,
      date: post.created_at,
      category: post.category,
      likes: post.likes,
      comments: post.comments
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Create new post
router.post('/', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { title, category, content, excerpt } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO posts (title, category, content, excerpt, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, category, content, excerpt, user.userId]
    );

    const [newPost] = await pool.execute(
      'SELECT p.*, u.firstname, u.lastname FROM posts p JOIN users u ON p.user_id = u.userID WHERE p.id = ?',
      [result.insertId]
    );

    res.status(201).json({
      id: newPost[0].id,
      title: newPost[0].title,
      excerpt: newPost[0].excerpt,
      content: newPost[0].content,
      author: `${newPost[0].firstname} ${newPost[0].lastname}`,
      likes: 0,
      comments: 0,
      isLiked: false,
      date: newPost[0].created_at,
      category: newPost[0].category
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Like post with duplicate check
router.post('/:id/like', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const postId = req.params.id;

    // Check if user has already liked the post
    const [existingLikes] = await pool.execute(
      'SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?',
      [postId, user.userId]
    );

    if (existingLikes.length > 0) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      await connection.execute(
        'INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)',
        [postId, user.userId]
      );
      
      await connection.execute(
        'UPDATE posts SET likes = likes + 1 WHERE id = ?',
        [postId]
      );

      await connection.commit();
      res.json({ message: 'Post liked successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

// Unlike post with existence check
router.post('/:id/unlike', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const postId = req.params.id;

    // Check if the like exists
    const [existingLikes] = await pool.execute(
      'SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?',
      [postId, user.userId]
    );

    if (existingLikes.length === 0) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      await connection.execute(
        'DELETE FROM post_likes WHERE post_id = ? AND user_id = ?',
        [postId, user.userId]
      );
      
      await connection.execute(
        'UPDATE posts SET likes = likes - 1 WHERE id = ?',
        [postId]
      );

      await connection.commit();
      res.json({ message: 'Post unliked successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Failed to unlike post' });
  }
});

export default router;