import { orderRepository } from '../repositories/index.js'
import { orderMiddleWare } from '../middle-ware/index.js'

class OrderController {
        async getAll(req, res) {
                let orders = await orderRepository.findAll()
                if (orders.length == 0)
                        res.send('Không có đơn hàng hiện tại!')
                else {
                        res.send(orders)
                }
        }

        getById(req, res) {
                const id = Number.parseInt(req.params.id)
                let order = orderRepository.findById(id)
                if (!order)
                        res.send('Đơn hàng không tồn tại!')
                else
                        res.send(order)
        }

        async insert(req, res) {
                let { _id, fullName, address, products, status } = req.body
                let order = await orderRepository.findById(Number.parseInt(_id))
                if (order)
                        res.send('Đơn hàng này đã tồn tại!')
                else { 
                        try {
                                let total = await orderMiddleWare.totalPriceHandle(products)
                                order = { _id, fullName, address, products, status, total }
                                orderRepository.insert(order)
                                res.send(order)
                        } catch (error) {
                                console.error(error)
                        }
                }
        }

        async update(req, res) {
                const _id = Number.parseInt(req.params.id)
                let { fullName, address, products, status } = req.body
                try {
                        let total = await orderMiddleWare.totalPriceHandle(products)
                        let order = { _id, fullName, address, products, status, total }
                        let result = orderRepository.update(_id, order)
                        if (!result)
                                res.send('Đơn hàng không tồn tại!')
                        else
                                res.send(order)
                } catch (error) {
                        console.error(error)
                }
        }

        async remove(req, res) {
                const _id = Number.parseInt(req.params.id)
                try {
                        let result = orderRepository.remove(_id)
                        if (!result)
                                res.send('Đơn hàng không tồn tại!')
                        else
                                res.send(result)
                } catch (error) {
                        console.error(error)
                }
        }
}

const orderController = new OrderController()
export default orderController