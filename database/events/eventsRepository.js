'use strict';

const { prepareObjectForInsert, getDbConnection, executeInsertQuery } = require('../../utils/dbHelper');

const eventsRepository = ({ logger, dbPool }) => {
    const create = (event) => {

        return getDbConnection(dbPool)
            .then((connection) => {
                logger.debug('Connection is opened');
                const preparedValue = prepareObjectForInsert(event);
                const fields = preparedValue.fields.join(',');

                const query = `INSERT INTO \`event\` (${fields}) VALUES (${preparedValue.preparedStmt})`;

                return executeInsertQuery(connection, query, preparedValue.values)
                    .then(() => {
                        logger.debug('Query successfully executed');
                        connection.release();
                        return event;
                    });
            })
            .catch((err) => {
                logger.error(err);
                return Promise.reject(err);
            });
    };

    return {
        create
    };
};

module.exports = eventsRepository;