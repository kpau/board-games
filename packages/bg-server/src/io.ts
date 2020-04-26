import { Server } from 'socket.io';
import debug from 'debug';
import chalk from 'chalk';

const log = debug('app:io');

export default function configIo(io: Server) {
  log(chalk.blue('Listening...'));

  io.on('connection', (socket) => {
    log(`${chalk.yellowBright('Connected:')} ${chalk.yellow(socket.id)}`);

    const eventName = 'io';
    socket.emit(eventName, { socket: 'connected' });

    socket.on(eventName, (data) => {
      log(`event: ${eventName} - ${data}`);
      io.emit(eventName, { socket: `msg ${data.length}` });
    });
  });

  // socket.emit -> current
  // socket.broadcast.emit -> everyone except current
  // io.broadcast -> everyone
}
