import { orderRepository } from '../repositories/index.js'
import { orderMiddleWare } from '../middle-ware/index.js'
import { productRepository, userRepository } from '../repositories/index.js'

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
                let { fullName, phone, address, products, total } = req.body
                let _id = Date.now() + "-" + fullName
                let status = 'Đang Xử Lý'
                try {
                        let order = { _id, fullName, phone, address, products, status, total }
                        orderRepository.insert(order)
                        products = await orderMiddleWare.updateProduct(products)
                        req.session.order = { products, status, total }
                        req.session.user = { _id, fullName, phone, address }
                        res.json({ redirect: '/order/show-thank-you' })
                } catch (error) {
                        console.error(error)
                }
        }

        async update(req, res) {
                const _id = Number.parseInt(req.params.id)
                let { fullName, phone, address, products, status, total } = req.body
                try {
                        let order = { _id, fullName, phone, address, products, status, total }
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

        async confirmOrder(req, res) {
                try {
                        let { _idUser, products } = req.body
                        let user = await userRepository.findById(_idUser)
                        let totalResult = await orderMiddleWare.totalPriceHandle(products)
                        products = totalResult.productsResult
                        let total = totalResult.total
                        let order = { products, total }
                        req.session.order = { order, user }
                        res.json({ redirect: '/order/show-confirm' })
                } catch (error) {
                        console.error(error)
                }
        }

        showCart(req, res) {
                res.render('./ejs/shoppingcart.ejs')
        }

        async showConfirm(req, res) {
                let { order, user } = await req.session.order
                res.render('./ejs/confirm-order.ejs', { order, user })
        }

        async showThankYouPage(req, res) {
                let order = await req.session.order
                let user = await req.session.user
                let products = await order.products
                res.render('./ejs/thank-you-for-shopping.ejs', { order, products, user })
        }
}

const orderController = new OrderController()
export default orderController