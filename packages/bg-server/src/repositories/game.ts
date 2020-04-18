import Game from '../models/game';
import BaseRepository from './base';


export default class GameRepository extends BaseRepository<Game> {
  readonly collection = 'games';
}
