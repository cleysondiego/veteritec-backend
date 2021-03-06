import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import clinicMiddleware from './app/middlewares/clinic';
import clinicUserMiddleware from './app/middlewares/clinicUser';
import decryptMiddleware from './app/middlewares/decrypt';

import ClinicController from './app/controllers/ClinicController';
import CustomerController from './app/controllers/CustomerController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PetController from './app/controllers/PetController';
import VaccineController from './app/controllers/VaccineController';
import LocationController from './app/controllers/LocationController';

const routes = new Router();

routes.get('/clinics', ClinicController.index);
routes.post('/clinics', ClinicController.store);

routes.post('/locations', LocationController.store);

routes.use(clinicMiddleware);
// routes.use(decryptMiddleware);

routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.use(clinicUserMiddleware);

routes.get('/customers', CustomerController.index);
routes.post('/customers', CustomerController.store);
routes.put('/customers', CustomerController.change);
routes.delete('/customers/:id', CustomerController.delete);

routes.get('/pets/:customerId', PetController.index);
routes.get('/pets', PetController.index);
routes.post('/pets', PetController.store);
routes.put('/pets', PetController.change);
routes.delete('/pets/:id', PetController.delete);

routes.get('/vaccines', VaccineController.index);
routes.post('/vaccines', VaccineController.store);
routes.put('/vaccines', VaccineController.change);
routes.delete('/vaccines/:id', VaccineController.delete);

routes.get('/locations/:petId', LocationController.index);

export default routes;
