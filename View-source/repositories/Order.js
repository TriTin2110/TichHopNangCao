import session from "express-session";
import { OrderModel } from "../models/index.js";
class OrderRepository { 
        async findAll() { 
                let orders = OrderModel.find().exec()
                return orders
        }

        async findByUsername(username) {
                let orders = await OrderModel.find({
                        username: username
                })
                return orders
        }

        async findById(id) { 
                let order = await OrderModel.findById(id).exec()
                return order
        }

        async insert(order) { 
                try {
                        OrderModel.insertOne(order)
                } catch (error) {
                        console.error(error)
                }
        }

        async update(id, order) { 
                try {
                        return OrderModel.findByIdAndUpdate(id, order).exec()
                } catch (error) {
                        console.error(error)
                }
        }

        async remove(id) { 
                try {
                        return OrderModel.findByIdAndDelete(id).exec()
                } catch (error) {
                        console.error(error)
                }
        }
}

const orderRepository = new OrderRepository()
export default orderRepository