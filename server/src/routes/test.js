import { Router } from 'express';

// Get a router instance
const router = Router();

// Router extends "/test"
router
  .route('/')
  .get((req, res) => {
    res.json({
      code: 0,
      status: 'Test GET successful',
      data: {
        id: 1,
        name: 'Sample name',
      },
    });
  })
  .post((req, res) => {
    res.json({
      code: 0,
      status: 'Test POST successful',
      data: {
        id: 2,
        name: 'Sample POST name',
      },
    });
  });

export default router;
