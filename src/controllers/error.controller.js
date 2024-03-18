import { NODE_ENV } from '../../config.js';
import { AppError } from'../utils/appError.util.js'


const sendErrorDev = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'fail',
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'fail',
    message: err.message || 'Something went very wrong',
  });
};

const hadleUniqueEmailError = () => {
  return new AppError('the email you entered is already taken', 400);
};

const handleJWTExpiredError = () => {
  return new AppError('Your session has expired! Please login again.', 401);
};

const handleJWTErrror = () => {
  return new AppError('Invalid session. Please login again', 401);
};

const handleImgExceedErrror = () => {
  return new AppError('You exceeded the number of images allowed', 400);
};

const globalErrorHandler = (err, req, res, next) => {
  if (NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'SequelizeUniqueConstraintError') {
      error = hadleUniqueEmailError();
    } else if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    } else if (err.name === 'JsonWebTokenError') {
      error = handleJWTErrror();
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      error = handleImgExceedErrror();
    }

    sendErrorProd(error, req, res);
  }
};

export { globalErrorHandler };
