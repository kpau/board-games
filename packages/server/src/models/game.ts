import { Schema, model } from 'mongoose';
import * as vm from '@bgames/shared/vm';
import { ModelDoc, transformSchema } from './model';

const schema = new Schema<vm.Game>({
  name: String,
  author: String,
  mobile: Boolean,
  players: {
    min: Number,
    max: Number,
    recommended: Number,
  },
});

transformSchema(schema);

type GameDoc = ModelDoc<vm.Game>;

const GameDB = model<GameDoc>('Game', schema);

export { GameDoc, GameDB };
