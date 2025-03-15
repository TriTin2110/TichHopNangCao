import express from 'express'
import { userRoute } from './routes/index.js'
import {writeLog, MessageType} from './util/WriteLog.js'
import dotenv from 'dotenv'

dotenv.config()

let app = express()
app.use('/user', userRoute);
app.listen(process.env.PORT, () => { 
        writeLog('Đã kết nối', MessageType.SUCCESS)
})