import React, { useContext } from 'react';
import {
  Navbar, Nav, Container,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UserContext from '../../../context/user';
import random from '../../../services/random';

const Header = withRouter((params) => {
  const [user] = useContext(UserContext);
  const { location } = params;

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
        <Nav className="ml-auto" activeKey={location.pathname}>
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
      <Container>
        <Navbar.Brand>BGames</Navbar.Brand>
        {greeting}
        {menu}
      </Container>
    </Navbar>
  );
});

export default Header;
