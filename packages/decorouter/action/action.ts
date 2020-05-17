import ActionResult from './action-result';

export type Action<TArgs extends any[], TResponse> =
  (...args: TArgs) => TResponse | ActionResult<TResponse>;

export type Actions<TCtrl> = {
  [K in keyof TCtrl]:
    TCtrl[K] extends Action<any[], any>
    ? TCtrl[K]
    : never;
};

export type ActionName<TCtrl> = {
  [K in keyof TCtrl]:
    TCtrl[K] extends Action<any[], any>
    ? K
    : never;
}[keyof TCtrl];
