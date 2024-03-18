import express from'express'
import {
  createUser,
  getAllUser,  
  updateUser,
  deleteUser,
  login,
} from'../controllers/user.controller.js'
import {
  protectSession, protectUserAccount,
  // protectUserAccount,
} from'../middlewares/auth.middleware.js'
import { emailExists, userExists } from '../middlewares/user.middleware.js';

const userRoutes = express.Router()

userRoutes.post('/login', login);

userRoutes.use(protectSession);

userRoutes.get('/', getAllUser);

userRoutes.post('/', emailExists,  createUser);

userRoutes.patch('/:id',userExists, protectUserAccount,  updateUser);
userRoutes.delete('/:id', userExists,protectUserAccount,  deleteUser);




// userRoutes.get('/me', userProducts);

// userRoutes.get('/orders', getAllOrdersUser);
// userRoutes.get('/orders/:id', orderExists, getOrderById);
// userRoutes
//   .use('/:id', userExists)
//   .route('/:id')
//   .delete(protectUserAccount, deleteUser);

export  { userRoutes };
