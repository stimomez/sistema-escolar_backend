import { db, DataTypes } from '../utils/database.util.js'


const Estudiante = db.define('estudiantes', {
  idEstudiante: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  idPersona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idAcudiente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  }
});

export { Estudiante };
