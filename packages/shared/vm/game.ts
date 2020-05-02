
import { ViewModel } from './base';

export interface Game extends ViewModel {
  name: string;
  author: string;
  mobile: boolean;
  players: {
    min: number;
    max: number;
    recommended: number;
  };
}
