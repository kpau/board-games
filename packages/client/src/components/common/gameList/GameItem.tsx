
import React from 'react';
import * as vm from '@bgames/shared/vm';
import { Card, ButtonGroup, Button } from 'react-bootstrap';

interface GameItemProps {
  game: vm.Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => (
  <Card bg="light">
    <Card.Body>
      <Card.Title>{game.name}</Card.Title>
      <Card.Text>
        {game.players.min}
        {' '}
        -
        {' '}
        {game.players.max}
      </Card.Text>
      <ButtonGroup>
        <Button variant="outline-primary">Create Room</Button>
        <Button variant="outline-secondary">Find Rooms</Button>
      </ButtonGroup>
    </Card.Body>
  </Card>
);

export default GameItem;
