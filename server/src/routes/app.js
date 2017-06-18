import express, { Router } from 'express';
import path from 'path';

import { APP_PATH } from '../constants';

// Get a router instance
const homeRouter = Router();

// Serve static assets from the app's build directory
homeRouter.use(express.static(APP_PATH));

homeRouter.get('/', (req, res) => {
  res.sendFile(path.join(APP_PATH, 'index.html'));
});

export default homeRouter;
