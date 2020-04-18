import { Router } from 'express';
import gameRouter from './game';

const appRouter = Router();

appRouter.use('/game', gameRouter);

export default appRouter;

/*
const routeSymbol = Symbol('route');

interface RouteConfig {
  path?: string;
}

interface Parameter {
  name: string;
  type: any;
}

interface ImplicitActionConfig extends RouteConfig {
  params?: Parameter[];
}

interface ActionConfig extends ImplicitActionConfig {
  method?: string;
}

interface ControllerPrototype {
  [routeSymbol]?: {
    base?: RouteConfig;
    actions?: ActionConfig[];
  };
}

interface Controller extends Function {
  prototype: ControllerPrototype;
}


function Route(config: RouteConfig): ClassDecorator {
  return function routeDecorator(ctrl: Controller) {
    if (config.path === undefined) {
      const endIndex = ctrl.name.indexOf('Controller');
      const name = ctrl.name.substring(0, endIndex);
      config.path = name.toLowerCase();
    }

    ctrl.prototype[routeSymbol] = ctrl.prototype[routeSymbol] || {};
    ctrl.prototype[routeSymbol]!.base = config;
  };
}

function Action(config: ActionConfig): MethodDecorator {
  return function actionDevorator<Function>(
    ctrlProto: ControllerPrototype,
    _actionName: string | symbol,
    _descriptor: TypedPropertyDescriptor<Function>,
  ) {
    if (config.path === undefined) {
      config.path = '';
    }
    if (config.method === undefined) {

    }

    ctrlProto[routeSymbol] = ctrlProto[routeSymbol] || {};
    ctrlProto[routeSymbol]!.actions = ctrlProto[routeSymbol]!.actions || [];
    ctrlProto[routeSymbol]!.actions!.push(config);
  };
}
*/
