import { writeLog, MessageType } from '../util/WriteLog.js'
class Exception extends Error { 
        static CANNOT_CONNECT_DB = 'Không thể kết nối đến DB'
        static CANNOT_INSERT = 'Không thể thêm mới'
        static USER_EXISTS = 'Tài khoản đã tồn tại!'

        constructor(message) { 
                super(message)
                writeLog(message, MessageType.ERROR)
        }
}
export default Exception