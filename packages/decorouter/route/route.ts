import { Router, Request } from 'express';
import debug from 'debug';
import chalk from 'chalk';
import { ArgConfig, getActionConfig, getControllerConfig } from '../config';
import { ActionResult, ActionName, Action } from '../action';

const log = debug('decorouter');

function getArg<T>(req: Request, argConfig: ArgConfig<T>) {
  const {
    name, required, source, cast,
  } = argConfig;

  let result: any;

  if (source === 'body') {
    if (!name) {
      result = req.body;
    } else {
      result = req.body[name];
    }
  } else if (source === 'param') {
    result = req.params[name];
  } else if (source === 'query') {
    result = req.query[name];
  } else {
    log(chalk.red(`Not supported argument source! ${argConfig}`));
    throw new Error('Not supported argument source!');
  }

  if (required && (result === undefined || result === null)) {
    log(chalk.red(`Required argument not present! ${req} - ${argConfig}`));
    throw new Error('Required argument not present!');
  }

  if (typeof result === 'string') {
    return cast(result);
  }

  return result;
}

function initAction<TCtrl, TResponse>(router: Router, ctrl: TCtrl, actionName: ActionName<TCtrl>) {
  const actionConfig = getActionConfig(ctrl, actionName);

  if (actionConfig === undefined) {
    log(chalk.red(`No configuration found for action! ${ctrl} - ${actionName}`));
    return;
  }

  if (actionConfig.method === undefined) {
    log(chalk.red(`No method defined for action! ${ctrl} - ${actionName}`));
    return;
  }

  if (actionConfig.path === undefined) {
    log(chalk.red(`No path defined for action! ${ctrl} - ${actionName}`));
    return;
  }

  if (actionConfig.args === undefined) {
    log(chalk.red(`No args defined for action! ${ctrl} - ${actionName}`));
    return;
  }

  const { method, path, args } = actionConfig;
  const action = ctrl[actionName] as unknown as Action<any[], any>;

  router[method](path, (req, res) => {
    const actionArgs = args.map((arg) => getArg(req, arg));

    const result: ActionResult<TResponse> | TResponse = action.apply(ctrl, actionArgs);

    const actionResult = result instanceof ActionResult ? result : ActionResult.Ok(result);

    if (actionResult.body === undefined) {
      return res.sendStatus(actionResult.status);
    }

    return res.status(actionResult.status).json(actionResult.body);
  });
}

export default function initRoutes<TCtrl>(ctrl: TCtrl): Router {
  const ctrlConfig = getControllerConfig<TCtrl>(ctrl);
  const ctrlRouter = Router();

  if (!ctrlConfig) {
    log(chalk.red(`No configuration found for controller! ${ctrl}`));
    return ctrlRouter;
  }

  if (ctrlConfig.path === undefined) {
    log(chalk.red(`No route path defined for controller! ${ctrl}`));
    return ctrlRouter;
  }

  if (ctrlConfig.actions === undefined || ctrlConfig.actions.length === 0) {
    log(chalk.yellow(`No route actions defined for controller! ${ctrl}`));
    return ctrlRouter;
  }

  const actionRouter = Router();

  ctrlConfig.actions
    .forEach((name) => initAction(actionRouter, ctrl, name));

  ctrlRouter.use(ctrlConfig.path, actionRouter);

  return ctrlRouter;
}
