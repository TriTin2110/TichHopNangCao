import mongoose, { Schema } from 'mongoose'
const UserModel = mongoose.model('User', new Schema({
        id: { type: Schema.Types.ObjectId },

        username: {
                type: String,
                required: true,
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