
import { Acudiente } from '../models/acudiente.model.js';
import {AppError} from '../utils/appError.util.js'
import {catchAsync} from '../utils/catchAsync.util.js'


const acudienteExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Acudiente.findOne({ where: { idAcudiente:id } });

  if (!user) {
    return next(new AppError('Acudiente no existe', 404));
  } 
  

  req.user = user;
  next();
});

const emailAcudienteExists = catchAsync(async (req, res, next) => {
  const { correo } = req.body;

  const acudiente = await Acudiente.findOne({ where: { correo } });

  if (acudiente) {
    return next(new AppError('Correo ya existe', 404));
  }
  next();
});

export{ acudienteExists,  emailAcudienteExists} 
