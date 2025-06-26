const Blog = require('../models/Blog');

// Middleware to check if user owns the blog
const checkBlogOwnership = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Check if the current user is the author of this blog
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'Access denied. You can only access your own blogs.' 
      });
    }
    
    // Attach blog to request object for use in route handler
    req.blog = blog;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { checkBlogOwnership };