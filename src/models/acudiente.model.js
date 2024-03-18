import { db, DataTypes } from '../utils/database.util.js'

// Create our first model (table)
const Acudiente = db.define('acudientes', {
  idAcudiente: {
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
  
});

export { Acudiente };
