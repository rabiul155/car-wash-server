"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    // err.message = err.message || 'Internal server error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign({}, err);
        error.message = err.message;
        error.statusCode = err.statusCode;
        sendErrorProd(error, res);
    }
};
exports.default = globalErrorHandler;
