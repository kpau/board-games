import { Schema, model } from 'mongoose';
import { ModelVM, ModelDoc } from './model';

interface GameVM extends ModelVM {
  name: string;
  author: string;
  mobile: boolean;
  players: {
    min: number;
    max: number;
    recommended: number;
  };
}

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

type GameDoc = ModelDoc<GameVM>;

const GameDB = model<GameDoc>('Game', schema);

export { GameVM, GameDoc, GameDB };
