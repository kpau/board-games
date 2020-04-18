import express from 'express';
import cors from 'cors';
import morganDebug from 'morgan-debug';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes';

export default function configApp(app: express.Application) {
  app.use(morganDebug('http', 'tiny'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api', router);
  app.use(express.static(path.join(__dirname, 'public/')));
}
