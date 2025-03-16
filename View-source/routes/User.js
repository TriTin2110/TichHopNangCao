import express from 'express'
import { userController } from '../controllers/index.js'

let userRoute = express()

userRoute.get('/get-all-user?email;:email', userController.getAll)
userRoute.get('/get-user', userController.getByUsername)
userRoute.post('/insert', userController.insert)
userRoute.put('/update', userController.update)
userRoute.delete('/delete', userController.remove)

export { userRoute }