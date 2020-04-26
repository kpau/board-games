import { Request } from 'express-serve-static-core';

export type ParamsId = {
  id: string;
};

export type ReqExtend<T> = ReqBodyExtends<T, any>;
export type ReqModel<TName extends string, TModel> = ReqBodyModel<TName, TModel, any>;

export type ReqBody<TBody> = Request<any, any, TBody>;

export type ReqBodyExtends<T, TBody> = ReqBody<TBody> & T;
export type ReqBodyModel<TName extends string, TModel, TBody> = ReqBodyExtends<{
  [K in TName]?: TModel;
}, TBody>;
