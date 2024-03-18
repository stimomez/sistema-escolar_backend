import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {  Usuario } from '../models/user.model.js'
import { catchAsync } from '../utils/catchAsync.util.js'
import { AppError } from '../utils/appError.util.js'
import { JWT_SECRET } from '../../config.js'
import {
  createPerson,
  updatePerson,
  deletePerson,
} from'../utils/person.util.js'

const createUser = catchAsync(async (req, res, next) => {
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
    rol,
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
  const newUser = await Usuario.create({
    idPersona: newPerson.idPersona,
    correo,
    rol,
    contrasena: hashPassword,
  });

  // Remove password from response
  newUser.contrasena = undefined;

  // await new Email(newUser.email).sendWelcome(newUser.userName);

  return res.status(201).json({
    status: 'success',
     newUser,
  });
});


const getAllUser = catchAsync(async (req, res, next) => {  

  const users = await Usuario.findAll({
    where: { estado: 'activo' },
    attributes: { exclude: ['contrasena'] },
  });


  return res.status(200).json({
    status: 'success',
    users,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
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

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await deletePerson(user.idPersona);
  return res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
  const { correo, contrasena } = req.body;
  
  const user = await Usuario.findOne({
    where: {
      correo,
      estado: 'activo',
    },
  });

  if (!user) {
    return next(new AppError('Credenciales invalidas', 400));
  }

  const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

  if (!isPasswordValid) {
    return next(new AppError('Credenciales invalidas', 400));
  }

  // Generate JWT (JsonWebToken) ->
  const token = await jwt.sign({ id: user.idUsuario }, JWT_SECRET, {
    expiresIn: '30d',
  });

  return res.status(200).json({
    status: 'success',
    token,
  });
});





export  {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  login
};
