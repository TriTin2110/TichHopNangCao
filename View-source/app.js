import express from 'express'
import dotenv from 'dotenv'
import { userRoute, productRoute, orderRoute } from './routes/index.js'
import { writeLog, MessageType } from './util/WriteLog.js'
import connectToDB from './database/mongodb.js'
import Exception from './exceptions/Exceptions.js'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import path from 'path'

dotenv.config()

let app = express()
const _filename = fileURLToPath(
        import.meta.url) //Đường dẫn đến file hiện tại
const _dirname = path.dirname(_filename) //Đường dẫn đến file hiện tại

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(_dirname, '../views'))) //khai báo cho express biết nơi phục vụ file tĩnh có trong thư mục views
app.use(bodyParser.json())
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);

app.listen(8080, async() => {
    try {
        connectToDB()
    } catch (error) {
        throw new Exception(Exception.CANNOT_CONNECT_DB)
    }

    writeLog('Đã kết nối đến NodeJS thành công!', MessageType.SUCCESS)
})