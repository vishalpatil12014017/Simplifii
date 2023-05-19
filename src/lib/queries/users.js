const db = require("../../models");
const constants = require("../../constants/constants");

create = async function (body) {
    return await db[constants.DB.table.USERS_MASTER].create(body);
};

getSingle = async function (body) {
    return await db[constants.DB.table.USERS_MASTER].findOne(body);
};

module.exports = {
    create,
    getSingle
};
