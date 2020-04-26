/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import { Router } from 'express';
import debug from 'debug';
import chalk from 'chalk';
import router from './game';

const log = debug('app:router');
const appRouter = Router();

appRouter.use('/game', router);

log(chalk.green('Done!'));

export default appRouter;
