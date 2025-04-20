import { productController } from '../controllers/index.js'
import express from 'express'

let productRoute = express()

//View
productRoute.get('/service', productController.redirectToService)

productRoute.get('/', productController.getAll)
productRoute.get('/:name', productController.getById)
productRoute.post('/', productController.insert.bind(productController))
productRoute.get('/delete/:name', productController.remove.bind(productController))
productRoute.put('/:name', productController.update.bind(productController))

export {productRoute}

