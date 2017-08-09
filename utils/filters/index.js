'use strict';

module.exports = ({ config, logger }) => {
    return {
        tokenAuthorizationFilter: require('./tokenAuthorization')({ config, logger })
    };
};