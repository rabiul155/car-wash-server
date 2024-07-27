import express, { Application, Request, Response } from 'express';
import cors from 'cors';

//route import
import notFoundRoute from './app/middleware/notFoundRoute';
import globalErrorHandler from './app/error/globalErrorHandler';
import { servicesRouter } from './app/modules/service/service.routes';
import { slotsRouter } from './app/modules/slot/slot.routes';
import { usersRouter } from './app/modules/user/user.routes';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

//Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server');
});

// Route

app.use('/api/services', servicesRouter);
app.use('/api/slots', slotsRouter);
app.use('/api/users', usersRouter);

//Not found route handle
app.all('*', notFoundRoute);

//Global error handling
app.use(globalErrorHandler);

export default app;
