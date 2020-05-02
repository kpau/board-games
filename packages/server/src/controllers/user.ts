import * as vm from '@bgames/shared/vm';
import { GameDB } from '../models/game';
import CrudController from './crud';

export default function GameController(DB: typeof GameDB) {
  const crudCtrl = CrudController<vm.Game>(DB);

  return { ...crudCtrl };
}
