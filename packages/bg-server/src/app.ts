import {
  Application, Request, Response, NextFunction,
} from 'express';
import cors from 'cors';
import morganDebug from 'morgan-debug';
import bodyParser from 'body-parser';
import router from './routes';

export default function configApp(app: Application) {
  app.use(morganDebug('app:web', 'tiny'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api', router);
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    if (err instanceof Error) {
      return res.json({
        name: err.name,
        msg: err.message,
        stack: err.stack,
      });
    }
    return res.json(`Error: ${err}`);
  });
}
