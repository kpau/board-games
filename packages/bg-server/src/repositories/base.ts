import debug from 'debug';
import { MongoClient, Collection, ObjectId } from 'mongodb';
import config from '../config';
import Model from '../models/model';

const log = debug('app:repo:base');

export default abstract class BaseRepository<TModel extends Model> {
  abstract readonly collection: string;

  protected async query<TResult>(
    process: (col: Collection<TModel>) => TResult,
  ): Promise<TResult | null> {
    let client: MongoClient | null = null;
    let result: TResult | null = null;

    try {
      client = await MongoClient.connect(config.db.url);
      const db = client.db(config.db.name);

      const col = db.collection<TModel>(this.collection);
      result = process(col);
    }
    catch (err) {
      log(err);
    }
    finally {
      if (client) {
        client.close();
      }
    }

    return result;
  }

  async getAll() {
    return this.query((col) => col.find().toArray());
  }

  async getById(id: string) {
    const filter = {
      _id: new ObjectId(id),
    };

    return this.query((col) => col.findOne(filter));
  }
}
