// vueloModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Segmento from "./segmentoModel.js";
const Vuelo = db.define('vuelos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // otros campos relacionados con el vuelo
});

Vuelo.hasMany(Segmento, { foreignKey: 'vuelo_id', as: 'segmentos' });

// Definimos la relación entre Vuelo y Publicacion (un Vuelo pertenece a una Publicacion)

export default Vuelo;
