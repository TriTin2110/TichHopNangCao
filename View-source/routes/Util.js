import express from 'express'
import { orderRepository, productRepository } from '../repositories/index.js'
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

utilRoute.get('/about-us', (req, res) => {
        res.render('./ejs/about-us.ejs')
})

utilRoute.get('/transport', (req, res) => {
        res.render('./ejs/transport.ejs')
})

utilRoute.get('/contact', (req, res) => {
        res.render('./ejs/contact-footer.ejs')
})

utilRoute.get('/introduce-my-group', (req, res) => {
        res.render('./ejs/introduce-group.ejs')
})

utilRoute.get('/info', async (req, res) => {
        let user = await req.session.user
        let orders = await orderRepository.findByUsername(user._id)
        let product = await req.session.productsInDB
        res.render('./ejs/introduce.ejs', { user: user, orders: orders, products: product })
})

utilRoute.post('/sign-up', userController.insert)

utilRoute.get('/search-product', async (req, res) => {
        let wordKey = req.query.wordKey
        let products = await req.session.productsInDB
        let user = await req.session.user
        let result = []
        let id
        for (let product of products) {
                id = product._id + ''
                if (id.includes(wordKey + ''))
                        result.push(product)
        }
        res.render('./ejs/search-result.ejs', { products: result, user: user })
})

export {utilRoute}