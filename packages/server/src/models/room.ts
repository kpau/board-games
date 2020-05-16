import { Schema, model } from 'mongoose';
import * as vm from '@bgames/shared/vm';
import { ObjectId } from 'mongodb';
import { ModelDoc, transformSchema } from './model';
import { doc } from '.';
import { UserDB } from './user';

type Methods = {
  getAuthor: () => Promise<string | null>;
};

const schema = new Schema<vm.Room & Methods>({
  name: String,
  author: ObjectId,
  createdOn: Date,
  game: {
    type: ObjectId,
    required: false,
  },
  private: Boolean,
  protected: Boolean,
  status: {
    type: String,
    enum: ['idle', 'playing'],
    required: false,
  },
  players: {
    type: {
      now: Number,
      max: Number,
    },
    required: false,
  },
});

transformSchema(schema);

schema.methods.getAuthor = async function getAuthor(this: vm.Room) {
  const author = await UserDB.findById(this.author);
  return author?.name === undefined ? null : author.name;
};

type RoomDoc = ModelDoc<vm.Room & Methods>;

const RoomDB = model<RoomDoc>('Room', schema);

export { RoomDoc, RoomDB };
