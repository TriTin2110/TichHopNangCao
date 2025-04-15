import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'
class UserRepository {
        async findAll() {
                const users = await UserModel.find().exec()
                return users
        }

        async findById(_id) {
                const user = await UserModel.findOne({ _id }).exec()
                return user
        }



        async insert(user) {
                user.password = await bcrypt.hash(user.password, Number.parseInt(process.env.SALT_ROUND))
                await UserModel.insertOne(user)
        }

        async update(id, object) {
                try {
                        return await UserModel.findByIdAndUpdate(id, object).exec()
                } catch (error) {
                        console.error(error)
                }
        }

        async remove(id) {
                try {
                        return await UserModel.findByIdAndDelete(id).exec()
                } catch (error) {
                        console.error(error)
                }
        }


}
const userRepository = new UserRepository()
export default userRepository