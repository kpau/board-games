import React from 'react';
import * as vm from '@bgames/shared/vm';
import {
  Table, Accordion, Card, CardDeck,
} from 'react-bootstrap';
import GameItem from './GameItem';

interface GameListProps {
  games: vm.Game[];
}

const GameList: React.FC<GameListProps> = (props) => {
  const { games } = props;
  return (
    <CardDeck>
      {games.map((game) => <GameItem key={game.id} game={game} />)}
    </CardDeck>
  );
};

export default GameList;
