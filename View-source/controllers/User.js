import express from 'express'
import { userRepository } from '../repositories/index.js'
import Exception from '../exceptions/Exceptions.js'
import bcrypt from 'bcrypt'
class UserController {
    async getAll(req, res) {
        let users = await userRepository.findAll()
        res.send(users)
    }

    async getByUsername(req, res) {
        const _id = req.body.username
        const password = req.body.password
        const userFound = await userRepository.findById(_id)
        const error = "Tài khoản không tồn tại hoặc mật khẩu sai!"
        if (!userFound) {
            res.render('./ejs/login.ejs', { error: error })
        } else {

            if (await bcrypt.compare(password, userFound.password)) {
                res.render('./ejs/index.ejs')
            } else {
                res.render('./ejs/login.ejs', { error: error })
            }

        }
        return userFound
    }

    async insert(req, res) {
        const { _id, password, fullName, phone, email } = req.body
        let user = await userRepository.findById(_id)
        if (user) {
            res.send('Tài khoản đã tồn tại')
        } else {
            try {
                user = { _id, password, fullName, phone, email }
                await userRepository.insert(user)
                res.send(user)
            } catch (error) {
                throw new Exception(Exception.CANNOT_INSERT)
            }
        }

    }

    async update(req, res) {
        let _id = req.params.name
        let { password, fullName, phone, email } = req.body
        let user = { password, fullName, phone, email }
        user = await userRepository.update(_id, user)
        if (!user)
            res.send('Tài khoản không tồn tại!')
        else
            res.send(user)
    }

    async remove(req, res) {
        let _id = req.params.name
        let user = await userRepository.remove(_id)
        if (!user)
            res.send('Tài khoản không tồn tại!')
        else
            res.send(user)

    }

}
let userController = new UserController()
export default userController