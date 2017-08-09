'use strict';

const url = require('url');
const geoip = require('geoip-lite');
const net = require('net');
const bowser = require('bowser');

/**
 * Creates new object by keys from provided value
 *
 * @param {Object} value
 * @param {Array} keys
 * @returns {Object}
 */
const pick = (value, keys) => {
    return Object
        .keys(keys)
        .reduce((prev, current) => {
            const key = keys[current];
            const item = value[key];
            if (item !== undefined) {
                prev[key] = item;
            }

            return prev;

        }, {});
};

/**
 * Validate url
 *
 * @param {String} urlValue
 * @returns {boolean}
 */
const isValidUrl = (urlValue) => {
    try {
        url.parse(urlValue);
        return true;
    } catch (error) {
        return false;
    }

};

/**
 * Validate IP, both v4 and v6 are valid
 *
 * @param {String} ip
 * @returns {boolean}
 */
const isValidIp = (ip) => {
    return net.isIP(ip) !== 0;
};

/**
 *  Get browser name from user-agent string
 *
 * @param {String} userAgent
 * @returns {string} browser name
 */
const getBrowserFromUA = (userAgent) => {
    const result = bowser._detect(userAgent);
    return result.name || 'unknown';
};

/**
 *  Get country code from ip
 *
 * @param {String} ip
 * @returns {String} 2 letter ISO-3166-1 country code
 */
const getCountryFromIp = (ip) => {
    //@TODO probably replace with some external service call
    const geo = geoip.lookup(ip);
    return geo ? geo.country : 'unknown';
};

module.exports = {
    pick,
    isValidUrl,
    isValidIp,
    getCountryFromIp,
    getBrowserFromUA
};