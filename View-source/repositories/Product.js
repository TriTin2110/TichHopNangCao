import { ProductModel } from "../models/index.js";
class ProductRepository {
        async findAll() {
                let products = await ProductModel.find().exec()
                return products
        }

        async findById(id) {
                let product = await ProductModel.findById(id).exec()
                return product
        }

        async insert(product) {
                try {
                        await ProductModel.insertOne(product)
                } catch (error) {
                        console.error(error)
                }
        }

        async update(id, product) {
                try {
                        return await ProductModel.findByIdAndUpdate(id, product)
                } catch (error) {
                        console.error(error)
                }
        }

        async remove(id) {
                try {
                        return await ProductModel.findByIdAndDelete(id).exec()
                } catch (error) {
                        console.error(error)
                }
        }
}
let productRepository = new ProductRepository()
export default productRepository 