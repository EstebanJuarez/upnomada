import express from 'express'

import { crearPublicacion, getPublicaciones, getPublicacionById } from "../controllers/publicacionController.js";
const routerPublicacion = express.Router()


routerPublicacion.post('/', crearPublicacion)
routerPublicacion.get('/', getPublicaciones)
routerPublicacion.get('/:id', getPublicacionById)



export default routerPublicacion
