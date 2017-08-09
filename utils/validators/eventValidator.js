'use strict';

const { pick, isValidUrl, isValidIp } = require('../commonHelper');

const PAGE_REFERRER = 'page-referrer';
const PAGE_URL = 'page-url';
const USER_IP = 'user-ip';

const MODEL_DEFINITION = [
    'timestamp', PAGE_REFERRER, 'user-id', PAGE_URL, 'page-id', 'user-agent', 'screen-resolution', USER_IP
];

const validate = (event) => {
    const executor = (resolve, reject) => {
        const validatedEvent = pick(event, MODEL_DEFINITION);
        if (!Object.keys(validatedEvent).length) {
            return reject(new Error('Object cannot be empty'));
        }

        const errors = [];

        if (validatedEvent[PAGE_REFERRER] && !isValidUrl(validatedEvent[PAGE_REFERRER])) {
            errors.push(`${PAGE_REFERRER} value is invalid`);
        }

        if (validatedEvent[PAGE_URL] && !isValidUrl(validatedEvent[PAGE_URL])) {
            errors.push(`${PAGE_URL} value is invalid`);
        }

        if (validatedEvent[USER_IP] && !isValidIp(validatedEvent[USER_IP])) {
            errors.push(`${USER_IP} value is invalid`);
        }

        //@TODO other validation rules, if required

        if (errors.length) {
            return reject(errors.join(',\n'));
        }

        return resolve(validatedEvent);
    };

    return new Promise(executor);
};

module.exports = {
    MODEL_DEFINITION,
    validate
};