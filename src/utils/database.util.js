import { Sequelize, DataTypes } from 'sequelize';
import {DB,DB_HOST,DB_PASSWORD,DB_PORT, DB_USER, NODE_ENV} from '../../config.js'

const db = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB,
  logging: false,
  dialectOptions:
    NODE_ENV === 'production'
      ? {
          ssl: {
            required: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

export  { db, DataTypes };
