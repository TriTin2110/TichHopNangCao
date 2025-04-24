import { productRepository } from '../repositories/index.js'
class OrderMiddleWare { 
         async totalPriceHandle(products) {
                 let total = 0;
                 let productsResult = []
                 for (const product of products) {
                         let p = await productRepository.findById(product.id)
                         let price = (p.specialPrice) ? p.specialPrice : p.price
                         const amount = product.amount

                         productsResult.push({ p, amount })
                         total += price * amount
                 }
                 return { productsResult, total } 
        }
}

const orderMiddleWare = new OrderMiddleWare()
export default orderMiddleWare