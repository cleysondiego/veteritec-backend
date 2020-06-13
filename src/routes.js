import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import clinicMiddleware from './app/middlewares/clinic';

import ClinicController from './app/controllers/ClinicController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/clinics', ClinicController.index);
routes.post('/clinics', ClinicController.store);

routes.use(clinicMiddleware);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

export default routes;
