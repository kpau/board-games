import { Router } from 'express';
import GameController from '../controllers/game';
import GameRepository from '../repositories/game';
import GameService from '../services/game';

const gameRouter = Router();
const gameRepo = new GameRepository();
const gameSrv = new GameService(gameRepo);
const gameController = new GameController(gameSrv);

gameRouter.get<{}>('/', async (req, res) => {
  const game = await gameController.getAll();
  res.json(game);
});

gameRouter.get<{ id: string }>('/:id', (req, res) => {
  const { id } = req.params;
  const game = gameController.getById(id);
  res.json(game);
});

export default gameRouter;
