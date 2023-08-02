// importamos la connecion a la bd

import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Producto from "./productoModel.js";

const DetallesVenta = db.define('detalles_venta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_venta: {
        type: DataTypes.INTEGER,
    },
    id_prod: {
        type: DataTypes.INTEGER,
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    descuento: {
        type: DataTypes.INTEGER,
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    precioDescuento: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    subtotal: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true
    }
});


DetallesVenta.belongsTo(Producto, {
    foreignKey: 'id_prod'
})




export default DetallesVenta
