import React, { useState, useEffect } from 'react';
import * as vm from '@bgames/shared/vm';
import { Jumbotron } from 'react-bootstrap';
import rest from '../../../services/rest';
import GameList from '../../common/gameList/GameList';

const gameRest = rest<vm.Game>('game');

const Games: React.FC = () => {
  const [games, setGames] = useState<vm.Game[]>([]);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const allGames = await gameRest.getAll();
      setGames(allGames);
    };
    fetchGames();
  }, []);

  return (
    <Jumbotron>
      <h1>Games</h1>
      <GameList games={games} />
    </Jumbotron>
  );
};

export default Games;
