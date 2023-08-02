// importamos la conexión a la bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Segmento = db.define('segmentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    arrival: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    departure: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});



// Definimos la relación entre Segmento y Publicacion (un Segmento pertenece a una Publicacion)

export default Segmento;
