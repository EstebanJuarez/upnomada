import express from 'express'

import { crearPublicacion, getPublicaciones, getPublicacionById,getPublicacionesByLimits,  crearCustomPublicacion, getLastPublicaciones, deletePublicacion, adminGetPublicacionById, adminUpdatePublicacionById } from "../controllers/publicacionController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';
const routerPublicacion = express.Router()


routerPublicacion.post('/', adminAuthMiddleware, crearPublicacion)
routerPublicacion.post('/custom', adminAuthMiddleware, crearCustomPublicacion)
routerPublicacion.get('/all', adminAuthMiddleware, getPublicaciones)
routerPublicacion.delete('/:id', adminAuthMiddleware, deletePublicacion)
routerPublicacion.get('/admin/:id', adminAuthMiddleware, adminGetPublicacionById)
routerPublicacion.put('/:id', adminAuthMiddleware, adminUpdatePublicacionById)

routerPublicacion.get('/lastPublicaciones', getLastPublicaciones)

routerPublicacion.get('/allPublicaciones', authMiddleware, getPublicacionesByLimits)
routerPublicacion.get('/:id', authMiddleware, getPublicacionById)



export default routerPublicacion
