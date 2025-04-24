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
                req.session.user = userFound
                res.redirect('/')
            } else {
                res.render('./ejs/login.ejs', { error: error })
            }

        }
        return userFound
    }

    async insert(req, res) {
        const { _id, password, fullName, phone, email, address } = req.body
        let user = await userRepository.findById(_id)
        if (user) {
            res.send('Tài khoản đã tồn tại')
        } else {
            try {
                user = { _id, password, fullName, phone, email, address }
                await userRepository.insert(user)
                res.send(user)
            } catch (error) {
                throw new Exception(Exception.CANNOT_INSERT)
            }
        }

    }

    async update(req, res) {
        let { _id, fullName, phone, email, address } = req.body
        let user = { fullName, phone, email, address }
        user = await userRepository.update(_id, user)
        if (!user)
            res.send('Tài khoản không tồn tại!')
        else {
            req.session.user = await userRepository.findById(_id)
            res.redirect('/info')
        }

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