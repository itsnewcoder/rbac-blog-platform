import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedBlogs, setExpandedBlogs] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (blogId) => {
    setExpandedBlogs(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  if (loading) return <div className="loading">Loading blogs...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="blog-list-container">
      <h1>All Blogs</h1>
      
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map(blog => {
            const isExpanded = expandedBlogs[blog._id];
            const shouldShowReadMore = blog.content.length > 200;
            
            return (
              <div key={blog._id} className="blog-card">
                <h3>{blog.title}</h3>
                <p className="blog-meta">
                  By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="blog-content">
                  {isExpanded ? blog.content : blog.content.substring(0, 200)}
                  {!isExpanded && shouldShowReadMore && '...'}
                </p>
                {shouldShowReadMore && (
                  <button 
                    onClick={() => toggleExpanded(blog._id)}
                    className="read-more-btn"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#007bff',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '14px',
                      padding: '4px 0',
                      marginTop: '8px'
                    }}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BlogList;