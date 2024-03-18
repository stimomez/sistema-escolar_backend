// Models


// Utils
import { Acudiente } from '../models/acudiente.model.js';
import { Usuario } from '../models/user.model.js';
import {AppError} from '../utils/appError.util.js'
import {catchAsync} from '../utils/catchAsync.util.js'

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Usuario.findOne({ where: { idUsuario:id } });

  if (!user) {
    return next(new AppError('Usuario no existe', 404));
  } 
  

  req.user = user;
  next();
});

const emailExists = catchAsync(async (req, res, next) => {
  const { correo } = req.body;

  const user = await Usuario.findOne({ where: { correo } });

  if (user) {
    return next(new AppError('Correo ya existe', 404));
  }
  next();
});



export{ userExists , emailExists} 
