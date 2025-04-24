import mongoose from 'mongoose'
import { writeLog, MessageType } from '../util/WriteLog.js'
let connectToDB = () => { 
        try {
                mongoose.connect('mongodb+srv://tamwukong1g:tam123@cluster0.8cktriu.mongodb.net/TichHopNangCao')
                writeLog('Đã kết nối MongoDB thành công!', MessageType.SUCCESS)
        } catch (error) {
                writeLog('Kết nối MongoDB thất bại!', MessageType.ERROR)
        }
}
export default connectToDB