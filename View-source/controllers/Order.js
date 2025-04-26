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
                let { username, fullName, phone, address, products, total } = req.body
                let _id = Date.now() + "-" + fullName
                let status = 'Đang Xử Lý'
                try {
                        let order = { _id, username, fullName, phone, address, products, status, total }
                        orderRepository.insert(order)
                        products = await orderMiddleWare.updateProduct(products)
                        req.session.order = { products, status, total }
                        res.json({ redirect: '/order/show-thank-you' })
                } catch (error) {
                        console.error(error)
                }
        }

        async update(req, res) {
                let { _id, fullName, phone, address, products, status, total } = req.body
                try {
                        let order = { _id, fullName, phone, address, products, status, total }
                        await orderMiddleWare.updateProduct(products)
                        let result = orderRepository.update(_id, order)
                        if (!result)
                                res.json({ notice: 'Đơn hàng không tồn tại!' })
                        else {
                                let orders = await orderRepository.findAll()
                                res.json({ notice: 'Đã cập nhật đơn hàng thành công!' })
                        }

                } catch (error) {
                        console.error(error)
                }
        }

        async remove(req, res) {
                const _id = req.params.id
                try {
                        let result = await orderRepository.remove(_id)
                        if (!result)
                                res.json({ notice: 'Đơn hàng không tồn tại!' })
                        else
                                res.json({ notice: 'Đã xóa đơn hàng thành công!' })
                } catch (error) {
                        console.error(error)
                }
        }

        async confirmOrder(req, res) {
                try {
                        let { _idUser, products } = req.body
                        //kiểm tra hàng tồn kho
                        let amountValid = await orderMiddleWare.checkAmountProduct(products)
                        if (!amountValid)
                                res.json({ error: 'Số lượng sản phẩm không hợp lệ!' })
                        else {
                                let user = await userRepository.findById(_idUser)
                                let totalResult = await orderMiddleWare.totalPriceHandle(products)
                                products = totalResult.productsResult
                                let total = totalResult.total
                                let order = { products, total }
                                req.session.order = { order, user }
                                res.json({ redirect: '/order/show-confirm' })
                        }
                } catch (error) {
                        console.error(error)
                }
        }

        async showCart(req, res) {
                let productInSession = await req.session.productInSession
                let user = await req.session.user
                if (user)
                        res.render('./ejs/shoppingcart.ejs', { products: productInSession, user: user })
                else
                        res.redirect('/login')
        }

        async showConfirm(req, res) {
                let { order, user } = await req.session.order
                res.render('./ejs/confirm-order.ejs', { order, user })
        }

        async showThankYouPage(req, res) {
                let order = await req.session.order
                let user = await req.session.user
                let products = await order.products
                req.session.productInSession = null
                res.render('./ejs/thank-you-for-shopping.ejs', { order, products, user })
        }

        async showService(req, res) {
                let orders = await orderRepository.findAll()
                let products = await productRepository.findAll()
                res.render('./ejs/order-service.ejs', { orders: orders, error: null, productInDBs: JSON.stringify(products) })
        }
}

const orderController = new OrderController()
export default orderController