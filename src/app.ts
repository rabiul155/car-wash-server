import express, { Application, Request, Response } from 'express';
import cors from 'cors';

//route import
import notFoundRoute from './app/middleware/notFoundRoute';
import globalErrorHandler from './app/error/globalErrorHandler';
import { serviceRoutes } from './app/modules/service/service.routes';
import {
  bookingRoutes,
  myBookingRouter,
} from './app/modules/booking/booking.routes';
import { userRoutes } from './app/modules/user/user.routes';
import { slotRoutes } from './app/modules/slot/slot.routes';
import { reviewRoutes } from './app/modules/reviews/reviews.routers';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

//Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server');
});

// Route

app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/my-bookings', myBookingRouter);

//Not found route handle
app.all('*', notFoundRoute);

//Global error handling
app.use(globalErrorHandler);

export default app;
