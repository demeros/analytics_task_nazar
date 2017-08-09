'use strict';

const { NOT_FOUND } = require('../httpCodes');

module.exports = ({ logger }) => {
    return (req, res, next) => {
        logger.info(`404 error handler, ${req.url} ${NOT_FOUND.message}`);
        const err = new Error(NOT_FOUND.message);
        err.status = NOT_FOUND.code;

        next(err);
    };
};