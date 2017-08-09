'use strict';

const VALID_TOKEN = '6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu';

/**
 *  Validates security token
 *
 * @param {String} token
 * @returns {boolean}
 */
const isSecurityTokenValid = (token) => {
    return token === VALID_TOKEN;
};

module.exports = {
    isSecurityTokenValid
};