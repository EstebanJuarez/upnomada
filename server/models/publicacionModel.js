// importamos la conexión a la bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Vuelo from "./vueloModel.js"; // Importamos el modelo de Vuelo

const Publicacion = db.define('publicaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    primeraFecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ultimaFecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Definimos la relación entre Publicacion y Segmento (una Publicacion tiene muchos Segmentos)
Publicacion.hasMany(Vuelo, { foreignKey: 'publicacion_id', as: 'vuelos' });

export default Publicacion;
