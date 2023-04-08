import * as dotEnv from 'dotenv';
import * as http from 'http';
import mongoose from 'mongoose';
import compression from 'compression'; // Compresses requests
import cors from 'cors';
import defaultRoute from '@/routes/defaultRoute';
import express from 'express';
import helmet from 'helmet';
import { GetAllUsers } from '@/routes/userRoute';

const defaultPort = 3000;
dotEnv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((e) => {
    console.log('MongoDB error', e);
  });

const port =
  (process.env.PORT as string) !== '' ? process.env.PORT : defaultPort;
const host = (process.env.HOST as string) !== '' ? process.env.HOST : '0.0.0.0';
const allowedOrigins = ['http://localhost'];

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: allowedOrigins,
  })
);

/*
 * Sample routes
 * app.post('/users', CreateUser);
 * app.get('/users/email/:email', FindUserByEmail);
 */
app.get('/', defaultRoute);
app.get('/users', GetAllUsers);

const server = http.createServer(app);

server.listen(port as number, host as string, () => {
  console.log(`
🚀 Server ready at: http://${host}:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`);
});

export default server;
