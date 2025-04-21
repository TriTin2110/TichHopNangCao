import Exception from "../exceptions/Exceptions.js"
import { productRepository } from "../repositories/index.js"
class ProductController {
        ProductController() {
                let products
        }

        async getAll(req, res) {
                const products = await productRepository.findAll()
                if (products.length == 0)
                        res.send('Không có sản phẩm nào tồn tại!')
                else
                        res.send(products)
        }

        async getById(req, res) {
                const _id = req.params.name
                const product = await productRepository.findById(_id)
                if (!product)
                        res.send('Sản phẩm không tồn tại!')
                else
                        res.send(product)
        }

        async insert(req, res) {
                let { _id, price, specialPrice } = req.body
                let products = await productRepository.findAll()
                const rating = 0
                let product = await productRepository.findById(_id)
                if (product)
                        res.redirect("/product/service?error=Sản phẩm đã tồn tại!")
                else {
                        try {
                                product = { _id, price, specialPrice, rating, image }
                                await productRepository.insert(product)
                                res.redirect("/product/service")
                        } catch (error) {
                                console.error(error)
                        }
                }
        }

        async update(req, res) {
                try {

                        const _id = req.params.name
                        const { price, specialPrice, rating } = req.body
                        const image = (!req.file) ? req.body.oldImage : req.file.filename
                        let product = { _id, price, specialPrice, image, rating }
                        product = await productRepository.update(_id, product)
                        if (!product)
                                res.redirect("/product/service?error=Sản phẩm không tồn tại trong danh sách!")
                        else
                                res.redirect("/product/service")
                } catch (error) {
                        console.error(error)
                }
        }

        async remove(req, res) {
                const _id = req.params.name
                const product = await productRepository.remove(_id)
                if (!product)
                        res.redirect("/product/service?error=Sản phẩm không tồn tại trong danh sách!")
                else
                        res.redirect("/product/service")
        }

        async redirectToService(req, res, myError) {
                let error = req.query.error
                let products = await productRepository.findAll()
                res.render('./ejs/product-service.ejs', { products: products, error: error })
        }


}
const productController = new ProductController()
export default productController