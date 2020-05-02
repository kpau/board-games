import mongoose from 'mongoose';
import debug from 'debug';
import chalk from 'chalk';
import config from './config';

const log = debug('app:db');

export default async function configDb() {
  try {
    log(chalk.yellow('Connecting...'));
    await mongoose.connect(`${config.db.url}/${config.db.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log(chalk.green('Conected!'));
  }
  catch (e) {
    log(chalk.red(`Connection failed: ${e}`));
  }
}
