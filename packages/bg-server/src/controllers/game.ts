import GameService from '../services/game';
import Game from '../models/game';

export default class GameController {
  constructor(private gameSrv: GameService) { }

  async getAll(): Promise<Game[]> {
    return await this.gameSrv.getAll() || [];
  }

  async getById(id: string): Promise<Game | null> {
    return await this.gameSrv.getById(id) || null;
  }
}
