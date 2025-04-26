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
                                p.amount -= amount
                                productRepository.update(productId, p)
                                
                                product = p
                                product.amount = amount
                                products.push(product)
                                
                        }
                }
                return products
        }

        async checkAmountProduct(orderedProduct) { 
                for (let product of orderedProduct) {
                        let productId = product.id
                        let p = await productRepository.findById(productId)
                        console.log(p)
                        if (p.amount < product.amount) {
                                return false
                        }
                }
                return true
        }
}

const orderMiddleWare = new OrderMiddleWare()
export default orderMiddleWare