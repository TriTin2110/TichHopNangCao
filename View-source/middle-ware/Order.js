import { productRepository } from '../repositories/index.js'
class OrderMiddleWare { 
         async totalPriceHandle(products) {
                 let total = 0;
                 for (const product of products)  {
                         let p = await productRepository.findById(product.id)
                         let price = (p.specialPrice) ? p.specialPrice : p.price
                         const quantity = product.quantity
                         total += price * quantity
                 }
                 return Number.parseInt(total)
        }
}

const orderMiddleWare = new OrderMiddleWare()
export default orderMiddleWare