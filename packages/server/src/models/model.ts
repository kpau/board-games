import { Document, Model } from 'mongoose';

type ModelVM = {};

type ModelDoc<T extends ModelVM> = Document & T;

type ModelDB<TVm extends ModelVM> = Model<ModelDoc<TVm>>;

export { ModelVM, ModelDoc, ModelDB };
