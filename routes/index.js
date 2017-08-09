'use strict';

const eventsRoutes = require('./events');
const analyticsRoutes = require('./analytics');

//@TODO it's make sense to add some kind of auto-loader to avoid manual routs registration
const register = ({ expressApp, config, logger, dbPool }) => {
    eventsRoutes.register({ expressApp, config, logger, dbPool });
    analyticsRoutes.register({ expressApp, config, logger, dbPool });
};

module.exports = {
    register
};
