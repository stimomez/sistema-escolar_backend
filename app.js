
import express from 'express';
import cors from 'cors'
import { userRoutes } from './src/routes/user.routes.js';
import { globalErrorHandler } from './src/controllers/error.controller.js';
import { acudienteRoutes } from './src/routes/acudiente.routes.js';
import { AppError } from './src/utils/appError.util.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/acudiente', acudienteRoutes);

app.all('*', (req, res, next) => {
    next(
      new AppError(
        `${req.method} ${req.originalUrl} 
        no encontrado en este servidor`,
        404
      )
    );
  });
  
  app.use(globalErrorHandler);

export default app;