import { Router } from 'express';
import { db } from '../models';
import { ParamsId } from './types';
import * as ctrl from '../controllers';

const router = Router();

const controller = ctrl.room(db.Room);

router.route('/')
  .get(controller.getPublic)
  .post(controller.create);

router.use<ParamsId>('/:id', controller.preById);
router.route('/:id')
  .get(controller.getById)
  .put(controller.update)
  .patch(controller.partialUpdate);

export default router;
