// importamos la connecion a la bd

import db from "../database/db.js";

import { DataTypes } from "sequelize";

import User from "./userModel.js";

const RecoveryCode = db.define('recovery_codes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

// Relación entre User y RecoveryCode
RecoveryCode.belongsTo(User, { foreignKey: 'id_user' });

export default RecoveryCode
