import express from 'express';

const app = express();

app.get('/', (request, response) => response.send('Hello'));

app.listen(3333, () => console.log('Servidor on'));
