'use strict';

const express = require('express');
const router = express.Router();
const { CREATED } = require('../../utils/httpCodes');
const eventValidator = require('../../utils/validators/eventValidator');
const { getBrowserFromUA, getCountryFromIp } = require('../../utils/commonHelper');

const parseBrowserAndCountry = (event) => {
    const executor = (resolve) => {
        event['browser'] = getBrowserFromUA(event['user-agent']);
        event['country'] = getCountryFromIp(event['user-ip']);

        return resolve(event);
    };
    return new Promise(executor);
};

module.exports = ({ logger, dbPool }) => {
    const eventsRepository = require('../../database/events/eventsRepository')({ logger, dbPool });

    router.post('/', (req, res, next) => {
        eventValidator
            .validate(req.body)
            .then(parseBrowserAndCountry)
            .then(eventsRepository.create)
            .then((result) => {
                res.status(CREATED.code);
                res.json(result);
            })
            .catch((err) => {
                next(err);
            });

    });

    return router;
};
