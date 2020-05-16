
import { ViewModel } from './base';
import { Id } from './id';

export interface Game extends ViewModel {
  name: string;
  author: Id;
  mobile: boolean;
  players: {
    min: number;
    max: number;
    recommended: number;
  };
}
