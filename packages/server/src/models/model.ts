import { ViewModel } from '@bgames/shared/vm';
import { Document, Model } from 'mongoose';

type ModelDoc<T extends ViewModel> = Document & T;

type ModelDB<TVm extends ViewModel> = Model<ModelDoc<TVm>>;

export { ModelDoc, ModelDB };
