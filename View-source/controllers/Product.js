import { productRepository } from "../repositories/index.js"
class ProductController {
        async getAll(req, res) {
                const products = await productRepository.findAll()
                if (products.length == 0)
                        res.send('Không có sản phẩm nào tồn tại!')
                else
                        res.send(products)
        }

        async getById(req, res) {
                const _id = req.params.id
                const product = await productRepository.findById(_id)
                if (!product)
                        res.send('Sản phẩm không tồn tại!')
                else
                        res.send(product)
        }

        async insert(req, res) {
                let { _id, name, price, specialPrice, rating } = req.body
                let product = await productRepository.findById(_id)
                if (product)
                        res.send('Sản phẩm đã tồn tại trong danh sách!')
                else {
                        try {
                                // id = Number.parseInt(id)
                                product = { _id, name, price, specialPrice, rating }
                                await productRepository.insert(product)
                                res.send(product)
                        } catch (error) {
                                console.error(error)
                        }
                }
        }

        async update(req, res) {
                const _id = Number.parseInt(req.params.id)
                const { name, price, specialPrice, rating } = req.body
                let product = { _id, name, price, specialPrice, rating }
                product = await productRepository.update(_id, product)
                if (!product)
                        res.send('Sản phẩm không tồn tại trong danh sách!')
                else
                        res.send(product)
        }

        async remove(req, res) {
                const _id = Number.parseInt(req.params.id)
                const product = await productRepository.remove(_id)
                if (!product)
                        res.send('Sản phẩm không tồn tại trong danh sách!')
                else
                        res.send(product)
        }
}
const productController = new ProductController()

export default productController