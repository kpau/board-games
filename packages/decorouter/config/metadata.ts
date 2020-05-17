import 'reflect-metadata';
import { ControllerConfig, ActionConfig } from './types';
import { ActionName } from '../action';

const routeKey = Symbol('route');
export function getControllerConfig<TCtrl>(
  ctrl: TCtrl,
): ControllerConfig<TCtrl> {
  return Reflect.getOwnMetadata(routeKey, ctrl) || {};
}

export function setControllerConfig<TCtrl>(
  ctrl: TCtrl,
  config: ControllerConfig<TCtrl>,
): void{
  Reflect.defineMetadata(routeKey, config, ctrl);
}

export function getActionConfig<TCtrl, TArgs extends any[]>(
  ctrl: TCtrl,
  actionName: ActionName<TCtrl>,
): ActionConfig<TArgs> {
  return Reflect.getOwnMetadata(routeKey, ctrl, actionName as string) || {};
}

export function setActionConfig<TCtrl, TArgs extends any[]>(
  ctrl: TCtrl,
  actionName: ActionName<TCtrl>,
  config: ActionConfig<TArgs>,
): void{
  Reflect.defineMetadata(routeKey, config, ctrl, actionName as string);
}
