const express = require('express');
const Blog = require('../models/Blog');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// NEW: Get admin's own blogs only (for dashboard)
router.get('/admin/my-blogs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    // Truncate content for dashboard display
    const blogsWithTruncatedContent = blogs.map(blog => ({
      ...blog.toObject(),
      content: blog.content.length > 150 
        ? blog.content.substring(0, 150) + '...' 
        : blog.content,
      fullContent: blog.content // Keep full content available
    }));
    
    res.json(blogsWithTruncatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create blog (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const blog = new Blog({
      title,
      content,
      author: req.user._id
    });

    await blog.save();
    await blog.populate('author', 'name');
    
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update blog (admin only - but only their own blogs)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // SECURITY FIX: First check if the blog exists and belongs to current admin
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Check if the current admin is the author of this blog
    if (existingBlog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only edit your own blogs.' });
    }
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    ).populate('author', 'name');

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete blog (admin only - but only their own blogs)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // SECURITY FIX: First check if the blog exists and belongs to current admin
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Check if the current admin is the author of this blog
    if (existingBlog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only delete your own blogs.' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;