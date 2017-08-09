'use strict';

module.exports = ({ config, logger }) => {
    return {
        NOT_FOUND_ERROR_HANDLER: require('./notFoundErrorHandler')({ config, logger }),
        GLOBAL_ERROR_HANDLER: require('./globalErrorHandler')({ config, logger })
    };
};
