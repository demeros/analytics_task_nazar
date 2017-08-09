'use strict';

const express = require('express');
const logger = require('pino')();
const config = require('./config/default');
const ErrorControllers = require('./utils/handlers/index')({ config, logger });
const dbPool = require('./database/connection')({ config });

const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//we should register routes after other middlewares, but before error handlers
routes.register({ expressApp: app, config, logger, dbPool });

app.use(ErrorControllers.NOT_FOUND_ERROR_HANDLER);
app.use(ErrorControllers.GLOBAL_ERROR_HANDLER);

module.exports = app;
