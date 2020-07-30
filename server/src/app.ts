import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { api } from './routes/api'; // route
import { errorHandler } from './middlewares/error-handler'; // error middleware

// API configuration
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(api);

// Middlewares
app.use(errorHandler);

export { app };
