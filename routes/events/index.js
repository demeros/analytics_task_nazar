'use strict';

const ROOT = '/events';

const register = ({ expressApp, config, logger, dbPool }) => {
    const eventsRoute = require('./eventsRoute')({ config, logger, dbPool });
    expressApp.use(ROOT, eventsRoute);
};

module.exports = {
    register
};
