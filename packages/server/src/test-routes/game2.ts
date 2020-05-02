// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { GameDB } from '../models/game';

// @route('/game')
export default class GameCtrl {
  constructor(private db: typeof GameDB) {}

  // @action('get', '/')
  // @get('/')
  // @action('get')
  // @get()
  async getAll() {}

  // @action('get', '/', [param.string('id', 'path')])
  // @get('get', '/', [param.string('id', 'path')])
  async getById(
    @param.string('id', 'path') id: string,
  ) {}
}
