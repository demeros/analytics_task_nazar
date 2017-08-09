'use strict';

const { INTERNAL_SERVER_ERROR } = require('../httpCodes');

module.exports = ({ config, logger }) => {

    // eslint-disable-next-line no-unused-vars, max-params
    return (err, req, res, next) => {
        err.status = err.status || INTERNAL_SERVER_ERROR.code;
        err.message = err.message || INTERNAL_SERVER_ERROR.message;

        logger.info(`Global error handler, ${req.url} ${err.message}`);

        res.status(err.status);
        //we don't want to see stacktrace in production mode
        const response = config.env === 'development' ? err : { code: err.status, message: err.message };
        res.json(response);
    };
};