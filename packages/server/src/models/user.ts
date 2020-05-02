import { Schema, model } from 'mongoose';
import * as vm from '@bgames/shared/vm';
import { ModelDoc } from './model';

const schema = new Schema({
  name: String,
});

type UserDoc = ModelDoc<vm.User>;

const UserDB = model<UserDoc>('User', schema);

export { UserDoc, UserDB };
