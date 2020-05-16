import { ViewModel } from './base';
import { DateString } from './date';
import { Id } from './id';

export interface Room extends ViewModel {
  name: string;
  author: Id;
  authorName: string;
  createdOn?: DateString;
  game?: Id;
  private: boolean;
  protected: boolean;
  status?: RoomStatus;
  players?: {
    now: number;
    max: number;
  };
}

export type RoomStatus = 'idle' | 'playing';
