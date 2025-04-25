import express from 'express'
import { productRepository } from '../repositories/index.js'

let utilRoute = express()

utilRoute.get('/', async (req, res) => { 
        let products
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

export {utilRoute}