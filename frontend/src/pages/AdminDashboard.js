import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [expandedBlogs, setExpandedBlogs] = useState(new Set());
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // SECURITY FIX: Use the new secure endpoint
      const response = await axios.get('/blogs/admin/my-blogs');
      setBlogs(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('Failed to fetch blogs: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await axios.put(`/blogs/${editingBlog._id}`, formData);
      } else {
        await axios.post('/blogs', formData);
      }
      
      setFormData({ title: '', content: '' });
      setShowForm(false);
      setEditingBlog(null);
      setError(''); // Clear any errors
      fetchBlogs();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    // Use fullContent if available, otherwise use content
    setFormData({ 
      title: blog.title, 
      content: blog.fullContent || blog.content 
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`/blogs/${blogId}`);
        setError(''); // Clear any errors
        fetchBlogs();
      } catch (error) {
        setError('Failed to delete blog: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const toggleExpanded = (blogId) => {
    const newExpanded = new Set(expandedBlogs);
    if (newExpanded.has(blogId)) {
      newExpanded.delete(blogId);
    } else {
      newExpanded.add(blogId);
    }
    setExpandedBlogs(newExpanded);
  };

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setShowForm(false);
    setEditingBlog(null);
    setError(''); // Clear any errors
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>My Blog Dashboard</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="create-button"
        >
          Create New Blog
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {showForm && (
        <div className="blog-form-container">
          <form onSubmit={handleSubmit} className="blog-form">
            <h3>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
            
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Content:</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                rows="8"
                placeholder="Write your blog content here..."
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {editingBlog ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="blogs-list">
        <h2>My Blogs ({blogs.length})</h2>
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <p>You haven't created any blogs yet.</p>
            <p>Click "Create New Blog" to get started!</p>
          </div>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} className="admin-blog-card">
              <h3>{blog.title}</h3>
              <p className="blog-meta">
                By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div className="blog-content">
                {expandedBlogs.has(blog._id) ? (
                  // Show full content
                  <p>{blog.fullContent || blog.content}</p>
                ) : (
                  // Show truncated content
                  <p>{blog.content}</p>
                )}
                
                {/* Show Read More/Less button only if content is truncated */}
                {blog.fullContent && blog.fullContent.length > 150 && (
                  <button 
                    onClick={() => toggleExpanded(blog._id)}
                    className="read-more-btn"
                  >
                    {expandedBlogs.has(blog._id) ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
              <div className="blog-actions">
                <button 
                  onClick={() => handleEdit(blog)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(blog._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;