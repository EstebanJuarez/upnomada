
import express from 'express'
import { createUser,getAllUsers, updateUser, getUserById, deleteUserById, registerUser , addDetallesGuestUser,registerGuest} from '../controllers/userController.js'

import {adminAuthMiddleware} from '../middleware/adminAuthMiddleware.js'
import { sellerAuthMiddleware } from '../middleware/sellerAuthMiddleware.js'


const routeUser = express.Router()

routeUser.post('/signin',  registerUser)
routeUser.post('/register',  registerGuest)
routeUser.post('/details',  addDetallesGuestUser)

routeUser.post('/', adminAuthMiddleware , createUser)
routeUser.get('/', adminAuthMiddleware , getAllUsers)
routeUser.get('/:id', adminAuthMiddleware , getUserById)
routeUser.delete('/:id', adminAuthMiddleware , deleteUserById)
routeUser.put('/:id', adminAuthMiddleware , updateUser)



export default routeUser