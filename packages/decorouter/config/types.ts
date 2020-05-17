import { ActionName } from '../action';

export type ActionMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type ArgSource = 'body' | 'query' | 'param';

export type ArgCast<T = string> = (valuse: string) => T;

export interface ArgConfig<T> {
  name: string;
  cast: ArgCast<T>;
  source: ArgSource;
  required: boolean;
}

export interface ActionConfig<TArgs extends any[]> {
  method?: ActionMethod;
  path?: string;
  args?: ArgConfig<TArgs[number]>[];
}

export interface ControllerConfig<TCtrl> {
  path?: string;
  actions?: (ActionName<TCtrl>)[];
}
