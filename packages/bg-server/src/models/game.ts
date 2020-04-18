import Model from './model';

export default interface Game extends Model {
  name: string;
  players: {
    min: number;
    max: number;
    recommended: number;
  };
}
