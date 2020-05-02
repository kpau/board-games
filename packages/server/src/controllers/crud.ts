import { Request, Response, NextFunction } from 'express';
import { ReqModel, ReqBodyModel } from '../routes/types';
import { ModelVM, ModelDB, ModelDoc } from '../models/model';

export default function CrudController
  <TVm extends ModelVM>(
  DB: ModelDB<TVm>,
) {
  type TDoc = ModelDoc<TVm>;
  type TDb = ModelDB<TVm>;

  type Req = ReqModel<'doc', TDoc>;
  type BodyReq = ReqBodyModel<'doc', TDoc, TVm>;

  async function getAll(req: Request, res: Response) {
    const docs = await DB.find();
    const items = docs.map((doc) => doc.toJSON());
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
    const doc = await DB.findById(id);

    if (doc) {
      req.doc = doc;
      return next();
    }

    return res.sendStatus(404);
  }

  async function getById(req: Req, res: Response) {
    const doc = req.doc!;
    return res.json(doc.toJSON());
  }

  async function update(req: BodyReq, res: Response) {
    const doc = req.doc!;
    const newItem = req.body;
    if (!newItem) {
      return res.sendStatus(400);
    }

    await doc.replaceOne(newItem);
    return res.sendStatus(200);
  }

  async function partialUpdate(req: BodyReq, res: Response) {
    const doc = req.doc!;
    const newGame = req.body;
    if (!newGame) {
      return res.sendStatus(400);
    }

    await doc.updateOne(newGame);
    return res.sendStatus(200);
  }

  async function del(req: Req, res: Response) {
    const doc = req.doc!;
    await doc.remove();
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
