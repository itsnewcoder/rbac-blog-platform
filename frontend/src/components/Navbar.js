import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/blogs" className="nav-logo">
          RBAC Blog
        </Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/blogs" className="nav-link">Blogs</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <span className="user-info">
                Welcome, {user.name} ({user.role})
              </span>
              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;