import { Router } from 'express';

import * as carController from './controllers/car.js';

const router = Router();

router.get('/', (req, res, next) => {
  res.send('This is the response from the index(/) route');
});

router.get('/cars', carController.getCars);

router.get('/cars/:carIdentifier', carController.getCar);

router.post('/cars', carController.saveCar);

router.put('/cars/:carIdentifier', carController.updateCar);

router.delete('/cars/:carIdentifier', carController.removeCar);

export default router;
