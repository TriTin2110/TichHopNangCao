import express from 'express'
import { userController } from '../controllers/index.js'

let userRoute = express()

userRoute.get('/get-all-user', userController.getAll)
userRoute.get('/get-user', userController.getByUsername)
userRoute.post('/insert', userController.insert)
userRoute.put('/update/:name', userController.update)
userRoute.delete('/delete/:name', userController.remove)
userRoute.get('/login-page', (req, res) => {
        res.render('./ejs/login.ejs')
})


export { userRoute }