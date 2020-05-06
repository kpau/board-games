import React, { useContext } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import UserContext from '../../../context/user';
import random from '../../../services/random';

const Header: React.FC = () => {
  const [user] = useContext(UserContext);

  const isExistingUser = !!user?.id;

  const greeting = (
    <Navbar.Text>
      {random.greeting(user?.name)}
    </Navbar.Text>
  );

  const menu = isExistingUser && (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Start Game</Nav.Link>
          <Nav.Link href="/rooms">Game Rooms</Nav.Link>
          <Nav.Link href="/games">Games list</Nav.Link>
          <Nav.Link href="/user">User</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand>BGames</Navbar.Brand>
      {greeting}
      {menu}
    </Navbar>

  );
};

export default Header;
