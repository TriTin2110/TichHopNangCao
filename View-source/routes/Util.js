import express from 'express'
import { productRepository } from '../repositories/index.js'
import { userController } from '../controllers/index.js'
let utilRoute = express()

utilRoute.get('/show-sign-up', (req, res) => {
        res.render('./ejs/sign-up.ejs', { error: null })
})

utilRoute.get('/', async (req, res) => { 
        let products = req.session.productsInDB
        if (!req.session.productsInDB) {
                products = await productRepository.findAll()
                req.session.productsInDB = products
        }
        let user = req.session.user
        res.render('./ejs/index.ejs', { products: products.slice(0, 6), user: user })
})
       
utilRoute.get('/login', (req, res) => { 
        res.render('./ejs/login.ejs', {error: null})
})

utilRoute.get('/info', (req, res) => {
        let user = req.session.user
        res.render('./ejs/introduce.ejs', { user: user })
})

utilRoute.post('/sign-up', userController.insert)



export {utilRoute}