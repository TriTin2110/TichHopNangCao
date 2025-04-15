import mongoose, { Schema } from 'mongoose'
const UserModel = mongoose.model('User', new Schema({
        _id: {
                type: String,
        },

        password: {
                type: String,
                required: true
        },

        fullName: {
                type: String,
        },

        phone: {
                type: String,
        },

        email: {
                type: String,
        }
}))
export default UserModel