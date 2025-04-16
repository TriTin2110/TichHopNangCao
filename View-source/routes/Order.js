import express from 'express'
import orderController from '../controllers/Order.js'

let orderRoute = express()
orderRoute.get('/', orderController.getAll)
orderRoute.get('/:id', orderController.getById)
orderRoute.post('/', orderController.insert)
orderRoute.put('/:id', orderController.update)
orderRoute.delete('/:id', orderController.remove)

export {orderRoute}
