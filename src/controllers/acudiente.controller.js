import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { catchAsync } from '../utils/catchAsync.util.js'
import { AppError } from '../utils/appError.util.js'
import { JWT_SECRET } from '../../config.js'
import {
  createPerson,
  updatePerson,
  deletePerson,
} from'../utils/person.util.js'
import { Acudiente } from '../models/acudiente.model.js'





const loginAcudiente = catchAsync(async (req, res, next) => {
  const { correo, contrasena } = req.body;
  
  const acudiente = await Acudiente.findOne({
    where: {
      correo,
      estado: 'activo',
    },
  });

  if (!acudiente) {
    return next(new AppError('Credenciales invalidas', 400));
  }

  const isPasswordValid = await bcrypt.compare(contrasena, acudiente.contrasena);

  if (!isPasswordValid) {
    return next(new AppError('Credenciales invalidas', 400));
  }

  // Generate JWT (JsonWebToken) ->
  const token = await jwt.sign({ id: acudiente.idAcudiente }, JWT_SECRET, {
    expiresIn: '30d',
  });

  return res.status(200).json({
    status: 'success',
    token,
  });
});

const createAcudiente = catchAsync(async (req, res, next) => {
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion,
    correo,
    contrasena,
  } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(contrasena, salt);


  const newPerson = await createPerson({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion
  });
  const newAcudiente = await Acudiente.create({
    idPersona: newPerson.idPersona,
    correo,
    contrasena: hashPassword,
  });

  // Remove password from response
  newAcudiente.contrasena = undefined;

  // await new Email(newAcudiente.email).sendWelcome(newAcudiente.userName);

  return res.status(201).json({
    status: 'success',
     newAcudiente,
  });
});

const getAllAcudientes = catchAsync(async (req, res, next) => {  

  const acudientes = await Acudiente.findAll({
    where: { estado: 'activo' },
    attributes: { exclude: ['contrasena'] },
  });


  return res.status(200).json({
    status: 'success',
    acudientes,
  });
});

const updateAcudiente = catchAsync(async (req, res, next) => {
  const { user } = req;
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion,
    // correo,
    // contrasena,
    rol,
  } = req.body;
  
  await updatePerson({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion,
    // correo,
    idPersona: user.idPersona,
  });
  // await user.update({ email });
//  console.log(pp);
  return res.status(204).json({ status: 'success' });
});

const deleteAcudiente = catchAsync(async (req, res, next) => {
  const { user } = req;

  await deletePerson(user.idPersona);
  return res.status(204).json({ status: 'success' });
});



export  {
  loginAcudiente,
  createAcudiente,
  getAllAcudientes,
  updateAcudiente,
  deleteAcudiente,
};
