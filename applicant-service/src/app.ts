import express, { Request, Response } from 'express';
import cors from 'cors';
import applicantRoutes from './routes/applicantRoutes';
import optionRoutes from './routes/optionRoutes';
import createError from "http-errors";
import loggerMiddleware from './middlewares/loggerMiddleware';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(loggerMiddleware);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

// Register routes
app.use('/v1/applicants', applicantRoutes);
app.use('/v1/option', optionRoutes);

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404))
})

// handle global error
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ message: err.message });
});

export default app;