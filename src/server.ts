import express, { json } from 'express';
import routes from './routes';
import './database';
import 'reflect-metadata';

const app = express();

app.use(json());
app.use(routes);

app.listen(3333, () => {
  console.log('👌 rodany!');
});
