'use strict';

const { isSecurityTokenValid } = require('../securityHelpers');
const { FORBIDDEN } = require('../httpCodes');

const AUTH_HEADER_NAME = 'Authorization';

module.exports = ({ logger }) => {
    const tokenAuthorizationFilter = (req, res, next) => {
        const token = req.header(AUTH_HEADER_NAME);

        if (isSecurityTokenValid(token)) {
            return next();
        }

        logger.info(`Authorization token: '${token}' is invalid`);

        //@TODO it's, probably, best to have centralized error handling mechanism
        res.status(FORBIDDEN.code);
        res.json(FORBIDDEN);
    };

    return tokenAuthorizationFilter;
};
