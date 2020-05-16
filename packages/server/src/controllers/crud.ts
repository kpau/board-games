import { Request, Response, NextFunction } from 'express';
import * as vm from '@bgames/shared/vm';
import { ReqModel, ReqBodyModel } from '../routes/types';
import { db, doc } from '../models';

export default function crud
  <TVm extends vm.ViewModel>(
  DB: db.Model<TVm>,
) {
  type TDoc = doc.Model<TVm>;
  type TDb = db.Model<TVm>;

  type Req = ReqModel<'doc', TDoc>;
  type BodyReq = ReqBodyModel<'doc', TDoc, TVm>;

  async function getAll(req: Request, res: Response) {
    const result = await DB.find();
    const items: TVm[] = result.map((item) => item.toJSON());
    return res.json(items);
  }

  async function create(req: BodyReq, res: Response) {
    const item = req.body;

    if (!item) {
      return res.sendStatus(400);
    }

    const newDoc = await DB.create(item);
    return res.status(200).send(newDoc.id);
  }

  async function preById(req: Req, res: Response, next: NextFunction) {
    const { id } = req.params;
    const item = await DB.findById(id);

    if (item) {
      req.doc = item;
      return next();
    }

    return res.sendStatus(404);
  }

  async function getById(req: Req, res: Response) {
    const item = req.doc!;
    return res.json(item.toJSON());
  }

  async function update(req: BodyReq, res: Response) {
    const item = req.doc!;
    const newItem = req.body;
    if (!newItem) {
      return res.sendStatus(400);
    }

    await item.replaceOne(newItem);
    return res.sendStatus(200);
  }

  async function partialUpdate(req: BodyReq, res: Response) {
    const item = req.doc!;
    const newGame = req.body;
    if (!newGame) {
      return res.sendStatus(400);
    }

    await item.updateOne(newGame);
    return res.sendStatus(200);
  }

  async function del(req: Req, res: Response) {
    const item = req.doc!;
    await item.remove();
    return res.sendStatus(200);
  }

  return {
    preById,
    getAll,
    getById,
    update,
    partialUpdate,
    create,
    delete: del,
  };
}
