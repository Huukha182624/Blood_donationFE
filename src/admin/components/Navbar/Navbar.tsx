import React from 'react';
import './Navbar.css';

interface AdminNavbarProps {
  brandName: string;
  userName: string;
  avatarUrl: string;
}

const Navbar: React.FC<AdminNavbarProps> = ({ brandName, userName, avatarUrl }) => {
  return (
    <nav className="admin-navbar">
      <div className="brand">{brandName}</div>
      <div className="user-info">
        <img src={avatarUrl} alt="avatar" className="avatar" />
        <span className="username">{userName}</span>
      </div>
    </nav>
  );
};

export default Navbar;
