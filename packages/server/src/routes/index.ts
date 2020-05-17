/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import { Router } from 'express';
import debug from 'debug';
import chalk from 'chalk';
import game from './game';
import user from './user';
import room from './room';
import testRouter from './deco';

const log = debug('app:router');
const appRouter = Router();

appRouter.use('/game', game);
appRouter.use('/user', user);
appRouter.use('/room', room);
appRouter.use(testRouter);

log(chalk.green('Done!'));

export default appRouter;
