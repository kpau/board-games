import { Router } from 'express';
import debug from 'debug';
import { GameDB } from '../models/game';
import { ParamsId } from './types';
import { GameController } from '../controllers';

const router = Router();

const ctrl = GameController(GameDB);

router.route('/')
  .get(ctrl.getAll)
  .post(ctrl.create);

router.use<ParamsId>('/:id', ctrl.preById);
router.route('/:id')
  .get(ctrl.getById)
  .put(ctrl.update)
  .patch(ctrl.partialUpdate)
  .delete(ctrl.delete);

export default router;
