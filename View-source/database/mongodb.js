import mongoose from 'mongoose'
import { writeLog, MessageType } from '../util/WriteLog.js'
let connectToDB = () => { 
        try {
                mongoose.connect('mongodb://0.0.0.0:27017/TichHopNangCao')
                writeLog('Đã kết nối MongoDB thành công!', MessageType.SUCCESS)
        } catch (error) {
                writeLog('Kết nối MongoDB thất bại!', MessageType.ERROR)
        }
}
export default connectToDB