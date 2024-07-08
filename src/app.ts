import express, { Application, Request, Response } from 'express';
import cors from 'cors';

//route import
import notFoundRoute from './app/middleware/notFoundRoute';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

//Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server');
});

//Not found route handle
app.all('*', notFoundRoute);

export default app;
