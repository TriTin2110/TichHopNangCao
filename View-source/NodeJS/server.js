import express from 'express'
import dotenv from 'dotenv'
import app from './routes/account/signIn.js'

dotenv.config()

let server = express()
server.use("/sign-in", app)
server.listen(8080, () => { 
        console.log('Server đang chạy!')
})