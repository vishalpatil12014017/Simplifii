const db = require("../../models");
const constants = require("../../constants/constants");

createVerifications = async function (body) {
  return await db[constants.DB.table.VERIFICATION_MASTER].create(body);
};

updateVerifications = async function (obj, query) {
  await db[constants.DB.table.VERIFICATION_MASTER].update(obj, {
    where: query,
  });
};

getUserById = async function (id) {
  return await db[constants.DB.table.VERIFICATION_MASTER].findOne({
    where: { userId: id },
  });
};

module.exports = {
  createVerifications,
  updateVerifications,
  getUserById,
};
