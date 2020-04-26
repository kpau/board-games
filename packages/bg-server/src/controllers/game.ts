import { GameDB, GameVM } from '../models/game';
import CrudController from './crud';

export default function GameController(DB: typeof GameDB) {
  const crudCtrl = CrudController<GameVM>(DB);

  return { ...crudCtrl };
}
