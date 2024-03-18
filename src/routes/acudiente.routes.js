import express from'express'
import { protectAcudienteAccount, protectSessionAcudiente, protectUserAccount,
  // protectUserAccount,
} from'../middlewares/auth.middleware.js'
import { createAcudiente, deleteAcudiente, getAllAcudientes, loginAcudiente, updateAcudiente } from '../controllers/acudiente.controller.js';
import { acudienteExists, emailAcudienteExists } from '../middlewares/acudiente.middleware.js';

const acudienteRoutes = express.Router()

acudienteRoutes.post('/login', loginAcudiente);

// acudienteRoutes.use(protectSessionAcudiente);

acudienteRoutes.get('/', getAllAcudientes);

acudienteRoutes.post('/', emailAcudienteExists,  createAcudiente);

acudienteRoutes.patch('/:id',acudienteExists,  updateAcudiente);
acudienteRoutes.delete('/:id', acudienteExists,  deleteAcudiente);

acudienteRoutes.post('/acudiente', emailAcudienteExists,  createAcudiente);



// acudienteRoutes.get('/me', userProducts);

// acudienteRoutes.get('/orders', getAllOrdersUser);
// acudienteRoutes.get('/orders/:id', orderExists, getOrderById);
// acudienteRoutes
//   .use('/:id', userExists)
//   .route('/:id')
//   .delete(protectUserAccount, deleteUser);

export  { acudienteRoutes };
