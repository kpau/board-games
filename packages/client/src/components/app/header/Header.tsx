import React from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';

const Header: React.FC = () => (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Navbar.Brand>BGames</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/">Start Game</Nav.Link>
        <Nav.Link href="/rooms">Game Rooms</Nav.Link>
        <Nav.Link href="/games">Games list</Nav.Link>
        <Nav.Link href="/user">User</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

);

export default Header;
