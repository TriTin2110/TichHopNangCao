import express from 'express'
import { register, findByUsername } from '../repositories/index.js'
import Exception from '../exceptions/Exceptions.js'

let getAll = (req, res) => { 
        let email = req.params.email
        res.send('user')
}

let getByUsername = async (req, res) => {
        const username = req.body.username
        console.log(username)
        const userFound = await findByUsername(username)
        res.send(userFound)
        return userFound
}

let insert = async (req, res) => {
        const { username, password, fullName, phone, email } = req.body
        let user = await findByUsername(username)
        try {
                if (user) { 
                        res.send('Tài khoản đã tồn tại')
                }     
                else { 
                        user = await register(username, password, fullName, phone, email)
                        res.send(user)
                }
        } catch (error) {
                throw new Exception(Exception.CANNOT_INSERT)
        }
}

let remove = (req, res) => {
        res.send('Delete User!')
}

let update = (req, res) => {
        res.send('Update User!')
}

export default { getAll, getByUsername, insert, remove, update }