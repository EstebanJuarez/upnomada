// importamos la connecion a la bd
import { DataTypes } from "sequelize";

import db from "../database/db.js";

const UsuariosDetalles = db.define('usuarios_detalles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dni: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    },
    postal: {
      type: DataTypes.STRING
    },
    calle: {
      type: DataTypes.STRING
    },
    provincia: {
      type: DataTypes.STRING
    },
    ciudad: {
      type: DataTypes.STRING
    }
  });
  

  
  export default UsuariosDetalles
