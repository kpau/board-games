import { Schema, model } from 'mongoose';
import * as vm from '@bgames/shared/vm';
import { ModelDoc } from './model';

const schema = new Schema({
  name: String,
  author: String,
  mobile: Boolean,
  players: {
    min: Number,
    max: Number,
    recommended: Number,
  },
});

type GameDoc = ModelDoc<vm.Game>;

const GameDB = model<GameDoc>('Game', schema);

export { GameDoc, GameDB };
