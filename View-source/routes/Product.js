import { productController } from '../controllers/index.js'
import express from 'express'

let productRoute = express()
//View
productRoute.get('/service', productController.redirectToService)
productRoute.get('/show-product/:id', productController.redirectToProduct)


productRoute.get('/', productController.getAll)
productRoute.get('/:name', productController.getById)
//upload.single('image'): Đây là middleware của multer để xử lý upload 1 file duy nhất
function insert(upload) {
        productRoute.post('/', upload.single('image'), productController.insert)
}

function update(upload) {
        productRoute.post('/update/:name', upload.single('image'), productController.update)
}

productRoute.get('/delete/:name', productController.remove)
productRoute.post('/add-to-cart', productController.addToCart)

export { productRoute, insert, update }

