
import express from 'express'
import { createUser, getAllUsers, updateUser, getUserById, deleteUserById, registerUser,userGetUserById } from '../controllers/userController.js'

import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js'
import loggedAuthMiddleware from '../middleware/loggedAuthMiddleware.js'


const routeUser = express.Router()

routeUser.post('/signin', registerUser)

routeUser.get('/user', loggedAuthMiddleware, userGetUserById)

routeUser.post('/', adminAuthMiddleware, createUser)
routeUser.get('/', adminAuthMiddleware, getAllUsers)
routeUser.get('/:id', adminAuthMiddleware, getUserById)
routeUser.delete('/:id', adminAuthMiddleware, deleteUserById)
routeUser.put('/:id', adminAuthMiddleware, updateUser)



export default routeUser