import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import clinicMiddleware from './app/middlewares/clinic';
import clinicUserMiddleware from './app/middlewares/clinicUser';

import ClinicController from './app/controllers/ClinicController';
import CustomerController from './app/controllers/CustomerController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PetController from './app/controllers/PetController';

const routes = new Router();

routes.get('/clinics', ClinicController.index);
routes.post('/clinics', ClinicController.store);

routes.use(clinicMiddleware);

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.use(clinicUserMiddleware);

routes.get('/customers', CustomerController.index);
routes.post('/customers', CustomerController.store);

routes.get('/pets/:customerId', PetController.index);
routes.post('/pets', PetController.store);

export default routes;
