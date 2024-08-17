import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create or update this CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">CREATORRR</div>
      <div className="profile-link">
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
