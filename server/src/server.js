import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';

// Import Routers
import appRouter from './routes/app';
import testRouter from './routes/test';

const server = express();
const PORT = 3000;

// Support encoded bodies
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Router for React application
server.use('/', appRouter);

// Test router to respond to GET/POST
server.use('/test', testRouter);

server.get('/hello', (req, res) => {
  console.log(`${chalk.green('/hello')} route accessed`);
  res.send('Hello World!');
});

// Start the server
server.listen(PORT, () => {
  console.log(`\n${chalk.bold(`Server is listening on port ${chalk.yellow(PORT)}`)}\n`);
});
