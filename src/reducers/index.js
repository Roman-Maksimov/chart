const settings = require('./settings');
const symbols = require('./symbols');
const user = require('./user');

export default {
    ...settings,
    ...symbols,
    ...user
}