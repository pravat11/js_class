import { Router } from 'express';

import loginSchema from './schemas/login.js';
import addCarSchema from './schemas/addCar.js';
import addUserSchema from './schemas/addUser.js';
import updateCarSchema from './schemas/updateCar.js';
import * as apiController from './controllers/api.js';
import * as carController from './controllers/car.js';
import * as userController from './controllers/user.js';
import authenticate from './middlewares/authenticate.js';
import getCarsQuerySchema from './schemas/getCarsQuery.js';
import * as manufacturerController from './controllers/manufacturer.js';
import { validateBody, validateQueryParams } from './middlewares/validation.js';

const router = Router();

router.get('/', apiController.getAPIDetails);

router.get('/manufacturers', authenticate, manufacturerController.getManufacturers);

router.get('/cars', authenticate, validateQueryParams(getCarsQuerySchema), carController.getCars);

router.get('/cars/:carIdentifier', authenticate, carController.getCar);

router.post('/cars', authenticate, validateBody(addCarSchema), carController.saveCar);

router.put('/cars/:carIdentifier', authenticate, validateBody(updateCarSchema), carController.updateCar);

router.delete('/cars/:carIdentifier', authenticate, carController.removeCar);

router.post('/users', validateBody(addUserSchema), userController.addUser);

router.post('/login', validateBody(loginSchema), userController.login);

export default router;
