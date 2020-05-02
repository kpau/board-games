import * as vm from '@bgames/shared/vm';
import { db } from '../models';
import crud from './crud';

export default function user(DB: typeof db.User) {
  const crudCtrl = crud<vm.User>(DB);

  return { ...crudCtrl };
}
