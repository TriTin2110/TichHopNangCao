import express from 'express'
import orderController from '../controllers/Order.js'

let orderRoute = express()

orderRoute.get('/show-cart', orderController.showCart)
orderRoute.get('/show-confirm', orderController.showConfirm)
orderRoute.get('/show-thank-you', orderController.showThankYouPage)
orderRoute.get('/service', orderController.showService)


orderRoute.get('/', orderController.getAll)
orderRoute.get('/:id', orderController.getById)
orderRoute.post('/', orderController.insert)
orderRoute.put('/', orderController.update)
orderRoute.delete('/:id', orderController.remove)
orderRoute.post('/confirm', orderController.confirmOrder)

export {orderRoute}
