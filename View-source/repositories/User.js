import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'

let register = async (username, password, fullName, phone, email) => { 
        let hashedPassword = await bcrypt.hash(password, Number.parseInt(process.env.SALT_ROUND))
        const userAdded = await UserModel.create({ username, password: hashedPassword, fullName, phone, email })
        return userAdded
}

let findByUsername = async (username) => { 
        const user = await UserModel.findOne({ username }).exec()
        return user
}

export { register, findByUsername }