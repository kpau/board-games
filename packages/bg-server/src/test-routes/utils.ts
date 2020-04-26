import 'reflect-metadata';
import chalk from 'chalk';
import debug from 'debug';
import { Router, IRouterHandler } from 'express';

const log = debug('app:routes:utils');

const routeKey = Symbol('route');

type ActionMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

type ParamSource = 'body' | 'query' | 'route' | 'any';

type ParamCast = (valuse: string) => any;

interface ParameterConfig {
  name: string;
  cast: ParamCast;
  source: ParamSource;
  required: boolean;
}

interface ActionConfig {
  method?: ActionMethod;
  path?: string;
  params: ParameterConfig[];
}

interface ControllerConfig {
  path?: string;
  actions?: Record<string, ActionConfig>;
}

function route(path?: string): ClassDecorator {
  return function routeDecorator(ctrl: Function): void {
    let routePath: string;

    if (path === undefined) {
      const endIndex = ctrl.name.indexOf('Controller');
      const name = ctrl.name.substring(0, endIndex);
      routePath = name.toLowerCase();
    }
    else {
      routePath = path;
    }

    let ctrlConfig: ControllerConfig = Reflect.getOwnMetadata(routeKey, ctrl);
    ctrlConfig = ctrlConfig || {};
    ctrlConfig.path = routePath;
  };
}

function action(method: ActionMethod, path = '/', params?: ParameterConfig[]): MethodDecorator {
  const newActionConfig: ActionConfig = {
    method,
    path,
    params: params || [],
  };

  return function actionDecorator<Function>(
    ctrlProto: Record<string, any>,
    actionName: string | symbol,
    _descriptor: TypedPropertyDescriptor<Function>,
  ): void {
    let ctrlConfig: ControllerConfig = Reflect.getOwnMetadata(routeKey, ctrlProto);
    ctrlConfig = ctrlConfig || {};
    ctrlConfig.actions = ctrlConfig.actions || {};

    let actionConfig = ctrlConfig.actions[actionName as string];
    actionConfig = actionConfig || {};
    actionConfig.params = actionConfig.params || [];

    actionConfig.params.forEach((p, i) => {
      newActionConfig.params[i] = p;
    });

    ctrlConfig.actions[actionName as string] = newActionConfig;

    Reflect.defineMetadata(routeKey, ctrlConfig, ctrlProto);
  };
}

function param(
  name: string,
  source: ParamSource = 'any',
  required = true,
  cast: ParamCast = ((v: string) => v),
): ParameterDecorator {
  const paramConfig: ParameterConfig = {
    name,
    source,
    required,
    cast,
  };

  return function paramDecorator(
    ctrlProto: Record<string, any>,
    actionName: string | symbol,
    paramIndex: number,
  ): void {
    let ctrlConfig: ControllerConfig = Reflect.getOwnMetadata(routeKey, ctrlProto);
    ctrlConfig = ctrlConfig || {};
    ctrlConfig.actions = ctrlConfig.actions || {};

    let actionConfig = ctrlConfig.actions[actionName as string];
    actionConfig = actionConfig || {};
    actionConfig.params = actionConfig.params || [];

    actionConfig.params[paramIndex] = paramConfig;
    ctrlConfig.actions[actionName as string] = actionConfig;

    Reflect.defineMetadata(routeKey, ctrlConfig, ctrlProto);
  };
}

function initRoutes(ctrlCtor: Function, appRouter: Router): void {
  const ctrlConfig: ControllerConfig = Reflect.getOwnMetadata(routeKey, ctrlCtor);
  const { path, actions } = ctrlConfig;

  if (path === undefined) {
    log(chalk.red('Error: No route path!'));
    return;
  }

  if (actions === undefined) {
    log(chalk.yellow('Warning: No actions configured!'));
    return;
  }

  const ctrlRouter = appRouter.route(path);

  function initAction(name: string, config: ActionConfig) {
    const { method } = config;
    if (method === undefined) {
      log(chalk.red(`Error: No HTTP method for Action: ${name}`));
      return;
    }

    const actionPath = config.path;
    if (actionPath === undefined) {
      log(chalk.red(`Error: No Path for Action: ${name}`));
      return;
    }

    const routeHanlder: IRouterHandler<typeof ctrlRouter> = (req, res) => {

    };

    ctrlRouter[method] = routeHanlder;
  }
  Object.getOwnPropertyNames(actions)
    .map((funcName) => [funcName, actions[funcName]] as const)
    .forEach(([funcName, actionConfig]) => initAction(funcName, actionConfig));
}
