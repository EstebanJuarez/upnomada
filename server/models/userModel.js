// importamos la connecion a la bd

import db from "../database/db.js";

import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'


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
        allowNull: false
    },
    telefono_user: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true // cambiar en prod
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true // cambiar en prod
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: true // cambiar en prod
    }
});



User.beforeCreate(async (user) => {
    // Siempre se realizará el hashing de la contraseña
    user.password_user = await bcrypt.hash(user.password_user, 10);
});

export default User
