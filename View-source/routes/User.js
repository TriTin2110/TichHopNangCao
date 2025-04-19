import express from 'express'
import { userController } from '../controllers/index.js'

let userRoute = express()

userRoute.get('/', userController.getAll)
userRoute.post('/findByUsername', userController.getByUsername)
userRoute.post('/', userController.insert)
userRoute.put('/:name', userController.update)
userRoute.delete('/:name', userController.remove)

userRoute.get('/login-page', (req, res) => {
    res.render('./ejs/login.ejs', { error: null })
})


export { userRoute }