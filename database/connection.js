'use strict';

const mysql = require('mysql');

module.exports = ({ config }) => {
    const { db: { host, port, user, password, database } } = config;

    //@TODO handle Pool events: error, connect etc.
    return mysql.createPool({
        host,
        user,
        port,
        password,
        database
    });
};