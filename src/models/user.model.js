import { db, DataTypes } from '../utils/database.util.js'

const Usuario = db.define('usuarios', {
  idUsuario: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  idPersona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal',
  },
});

export { Usuario };
