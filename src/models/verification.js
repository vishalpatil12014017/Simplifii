const constant = require("../constants/constants");
module.exports = (sequelize, DataType) => {
  const verification = sequelize.define(
    constant.DB.table.VERIFICATION_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      userId: {
        type: DataType.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: constant.DB.table.USERS_MASTER,
          },
          key: "id",
        },
      },
      otp: {
        type: DataType.INTEGER,
        allowNull: true,
      },
      token: {
        type: DataType.STRING(4000),
        allowNull: true,
      },
      otpGeneratedAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      loginAttempts: {
        allowNull: true,
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      succesfulAttempts: {
        allowNull: true,
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      blockedUntil: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      createdAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
    },
    {
      hooks: {
        beforeCreate: async (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
          record.dataValues.otpGeneratedAt = Math.floor(Date.now());
          record.dataValues.tokenGeneratedAt = Math.floor(Date.now());
        },
        beforeUpdate: async (record, options) => {
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeBulkUpdate: (record, options) => {
          record.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (record, options) => {
          record.attributes.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );

  return verification;
};
