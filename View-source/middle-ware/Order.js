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

        async updateProduct(orderedProduct) {
                let products = []
                let amount
                for (let product of orderedProduct) {
                        let productId = product.productId
                        let p = await productRepository.findById(productId)
                        if (p) {
                                amount = product.amount
                                console.log(amount)
                                product = p
                                product.amount = amount
                                console.log(product)
                                products.push(product)
                                p.amount -= amount
                                console.log(p)
                                productRepository.update(productId, p)
                        }
                }
                return products
        }
}

const orderMiddleWare = new OrderMiddleWare()
export default orderMiddleWare