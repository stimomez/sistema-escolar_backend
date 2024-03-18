import { db, DataTypes } from '../utils/database.util.js'

const Persona = db.define('personas', {
  idPersona: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  primerNombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundoNombre: {
    type: DataTypes.STRING,
  },
  primerApellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   segundoApellido: {
    type: DataTypes.STRING,
  },
  tipoIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fechaNacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.TEXT,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  },
});

export {Persona}
