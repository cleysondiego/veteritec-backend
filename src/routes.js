import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import clinicMiddleware from './app/middlewares/clinic';
import clinicUserMiddleware from './app/middlewares/clinicUser';

import ClinicController from './app/controllers/ClinicController';
import CustomerController from './app/controllers/CustomerController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PetController from './app/controllers/PetController';
import VaccineController from './app/controllers/VaccineController';

const routes = new Router();

routes.get('/clinics', ClinicController.index);
routes.post('/clinics', ClinicController.store);

routes.use(clinicMiddleware);

routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.use(clinicUserMiddleware);

routes.get('/customers', CustomerController.index);
routes.post('/customers', CustomerController.store);
routes.put('/customers', CustomerController.change);

routes.get('/pets', PetController.index);
routes.post('/pets', PetController.store);
routes.put('/pets', PetController.change);

routes.get('/vaccines', VaccineController.index);
routes.post('/vaccines', VaccineController.store);

export default routes;
