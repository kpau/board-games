import GameRepository from '../repositories/game';

export default class GameService {
  constructor(private gameRepo: GameRepository) { }

  async getAll() {
    return this.gameRepo.getAll();
  }

  async getById(id: string) {
    return this.gameRepo.getById(id);
  }
}
