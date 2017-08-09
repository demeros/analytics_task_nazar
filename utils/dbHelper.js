'use strict';

//@TODO Promisefy dbConnection???

/**
 * Promise wrapper for getting mysql connection from pool
 *
 * @param {Pool} dbPool initialized mysql pool
 * @returns {Promise<Connection>} mysql connection
 */
const getDbConnection = (dbPool) => {
    const executor = (resolve, reject) => {
        dbPool.getConnection((error, connection) => {
            if (error) {
                return reject(error);
            }

            return resolve(connection);
        });
    };

    return new Promise(executor);
};

/**
 * Promise wrapper for insert queries
 *
 * @param {Connection} dbConnection
 * @param {String} sqlQuery
 * @param {Array} values
 * @returns {Promise<Array>}
 */
const executeInsertQuery = (dbConnection, sqlQuery, values) => {
    const executor = (resolve, reject) => {
        if (!Array.isArray(values)) {
            return reject(new Error('Parameter `values` should be an array'));
        }

        dbConnection.query(sqlQuery, values, (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result);
        });
    };

    return new Promise(executor);
};

/**
 * Promise wrapper for select queries
 *
 * @param {Connection} dbConnection
 * @param {String} sqlQuery
 * @returns {Promise<Array>}
 */
const executeSelectQuery = (dbConnection, sqlQuery) => {
    const executor = (resolve, reject) => {
        dbConnection.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result);
        });
    };

    return new Promise(executor);
};

/**
 * Prepare object for saving to DB by splitting up fields and values to different arrays with same order
 *
 * @param {Object} newObject any object
 * @returns {{fields: Array, values: Array}}
 */
const prepareObjectForInsert = (newObject) => {
    const fields = [];
    const values = [];

    Object.keys(newObject).forEach((field) => {
        fields.push('`' + field + '`');
        values.push(newObject[field]);
    });

    return {
        fields,
        values,
        preparedStmt: '?,'.repeat(values.length).slice(0, -1)
    };
};

module.exports = {
    getDbConnection,
    prepareObjectForInsert,
    executeInsertQuery,
    executeSelectQuery
};