import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header>
    <p>Header</p>
    <nav>
      <Link to="/">Test</Link>
      <Link to="/user/1">User 1</Link>
      <Link to="/user/2">User 2</Link>
      <Link to="/home">Home</Link>
    </nav>
  </header>
);

export default Header;
