import express from 'express'
import { userController } from '../controllers/index.js'

let userRoute = express()

userRoute.get('/', userController.getAll)
userRoute.post('/findByUsername', userController.getByUsername)
userRoute.post('/', userController.insert)
userRoute.post('/update', userController.update)
userRoute.post('/:name', userController.remove)

export { userRoute }