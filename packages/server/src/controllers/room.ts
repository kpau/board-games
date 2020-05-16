import { Request, Response } from 'express';
import * as vm from '@bgames/shared/vm';
import { db, doc } from '../models';
import crud from './crud';
import { ReqModel, ReqBodyModel } from '../routes/types';

export default function room(DB: typeof db.Room) {
  type Req = ReqModel<'doc', doc.Room>;
  type BodyReq = ReqBodyModel<'doc', doc.Room, vm.Room>;

  const crudCtrl = crud<vm.Room>(DB);

  async function create(req: BodyReq, res: Response) {
    req.body.createdOn = new Date().toISOString();
    return crudCtrl.create(req, res);
  }

  async function getPublic(req: Request, res: Response) {
    const result = await DB.find({ private: false });
    await Promise.all(result.map((r) => r.fillAuthor()));

    const items: vm.Room[] = result.map((item) => item.toJSON());
    return res.json(items);
  }

  return { ...crudCtrl, create, getPublic };
}
