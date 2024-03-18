import jwt from 'jsonwebtoken'

// Models
import{  Usuario }  from '../models/user.model.js';

// Utils
import { catchAsync } from'../utils/catchAsync.util.js'
import { AppError } from'../utils/appError.util.js'
import { JWT_SECRET } from'../../config.js'
import { Acudiente } from '../models/acudiente.model.js';


const protectSession = catchAsync(async (req, res, next) => {
  let token;

  // Extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Sesion invalida', 403));
  }

  // Ask JWT (library), if the token is still valid
  const decoded = await jwt.verify(token, JWT_SECRET);

  const user = await Usuario.findOne({
    where: { idUsuario: decoded.id, estado: 'activo' },
  });

  if (!user) {
    return next(new AppError('El dueño de este token ya no existe', 403));
  }
  req.sessionUser = user;
  next();
});

const protectSessionAcudiente = catchAsync(async (req, res, next) => {
  let token;

  // Extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Sesion invalida', 403));
  }

  // Ask JWT (library), if the token is still valid
  const decoded = await jwt.verify(token, JWT_SECRET);

  const acudiente = await Acudiente.findOne({
    where: { idAcudiente: decoded.id, estado: 'activo' },
  });

  if (!user) {
    return next(new AppError('El dueño de este token ya no existe', 403));
  }
  req.sessionUser = acudiente;
  next();
});


const protectUserAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.idUsuario !== user.idUsuario) {
    return next(new AppError('No eres dueño de esta cuenta', 403));
  }
  next();
};
const protectAcudienteAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.idAcudiente !== user.idAcudiente) {
    return next(new AppError('No eres dueño de esta cuenta', 403));
  }
  next();
};

export  { protectSession, protectUserAccount, protectSessionAcudiente,protectAcudienteAccount }
