import express from 'express'
import dotenv from 'dotenv'
import { userRoute } from './routes/index.js'
import {writeLog, MessageType} from './util/WriteLog.js'
import connectToDB from './database/mongodb.js'
import Exception from './exceptions/Exceptions.js'
import bodyParser from 'body-parser'
dotenv.config()

let app = express()
app.use(bodyParser.json())
app.use('/user', userRoute);
app.listen(process.env.PORT, async () => { 
        try {
                connectToDB()
        } catch (error) {
                throw new Exception(Exception.CANNOT_CONNECT_DB)
        }
        
        writeLog('Đã kết nối đến NodeJS thành công!', MessageType.SUCCESS)
})