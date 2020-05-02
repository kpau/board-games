import { Router } from 'express';
import { db } from '../models';
import { ParamsId } from './types';
import * as ctrl from '../controllers';
import crud from '../controllers/crud';

const router = Router();

const controller = ctrl.user(db.User);

router.route('/')
  .get(controller.getAll)
  .post(controller.create);

router.use<ParamsId>('/:id', controller.preById);
router.route('/:id')
  .get(controller.getById)
  .put(controller.update)
  .patch(controller.partialUpdate)
  .delete(controller.delete);

export default router;
