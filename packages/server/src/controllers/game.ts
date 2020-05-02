import * as vm from '@bgames/shared/vm';
import crud from './crud';
import { db } from '../models';

export default function game(DB: typeof db.Game) {
  const crudCtrl = crud<vm.Game>(DB);

  return { ...crudCtrl };
}
