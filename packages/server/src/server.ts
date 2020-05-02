
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import chalk from 'chalk';
import debug from 'debug';
import configApp from './app';
import configIo from './io';
import configDb from './db';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = +(process.env.PORT || 4000);
const log = debug('app');
const ch = new chalk.Instance({ level: 1 });

server.listen(port, () => {
  log(`${ch.blueBright(`http://localhost:${port}/`)} - ${ch.green('Server started!')}`);
});

configDb();
configApp(app);
configIo(io);
