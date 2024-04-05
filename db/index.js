const promiseLib = require('bluebird');
const monitor = require('pg-monitor');

const initOptions = {
  promiseLib,
}

monitor.attach(initOptions); // attach to all query events;
// See API: https://github.com/vitaly-t/pg-monitor#attachoptions-events-override

monitor.setTheme('matrix'); // change the default theme;
// Other themes: https://github.com/vitaly-t/pg-monitor/wiki/Color-Themes

monitor.setLog((msg, info) => {
    console.log(msg, info);
    // save the screen messages into your own log file;
});
// See API: https://github.com/vitaly-t/pg-monitor#log


const pgp = require('pg-promise')(initOptions);

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'test_db',
    user: 'nkumarjha',
    // to auto-exit on idle, without having to shut-down the pool;
    // see https://github.com/vitaly-t/pg-promise#library-de-initialization
    allowExitOnIdle: true
};

const db = pgp(cn);

module.exports = db;