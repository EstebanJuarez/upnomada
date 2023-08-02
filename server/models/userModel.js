// importamos la connecion a la bd

import db from "../database/db.js";

import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import UsuariosDetalles from "./userDetallesModel.js";


const User = db.define('usuarios', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_user: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apellido_user: {
        type: DataTypes.STRING,
        allowNull: true
    },

    email_user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    password_user: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true // cambiar en prod


    }
});


User.hasOne(UsuariosDetalles, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE'
});

User.beforeCreate(async (user) => {
    if (user.role !== 'guest') {
        return await bcrypt.hash(user.password_user, 10).then((password) => {
            user.password_user = password;
        });
    }
});

export default User
