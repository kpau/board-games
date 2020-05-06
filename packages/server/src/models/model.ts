/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { ViewModel } from '@bgames/shared/vm';
import { Document, Model, Schema } from 'mongoose';

type ModelDoc<T extends ViewModel> = Document & T;

type ModelDB<TVm extends ViewModel> = Model<ModelDoc<TVm>>;

function transformSchema<T extends ViewModel>(schema: Schema<T>) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc: ModelDoc<T>, db: ModelDB<T> & { _id: string }) {
      delete db._id;
    },
  });
}

export { ModelDoc, ModelDB, transformSchema };
