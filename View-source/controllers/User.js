import express from 'express'
import {register} from '../repositories/index.js'
import Exception from '../exceptions/Exceptions.js'

let getAll = (req, res) => { 
        let email = req.params.email
        res.send('user')
}

let getByUsername = (req, res) => {
        res.send('Get User By Username!')
}

let insert = async (req, res) =>  {
        const { username, password, fullName, phone, email } = req.body
        try {
                const userAdded = await register(username, password, fullName, phone, email) 
                res.send(userAdded)
        } catch (error) {
                throw new Exception(Exception.CANNOT_CONNECT_INSERT)
        }
        
}

let remove = (req, res) => {
        res.send('Delete User!')
}

let update = (req, res) => {
        res.send('Update User!')
}

export default { getAll, getByUsername, insert, remove, update }