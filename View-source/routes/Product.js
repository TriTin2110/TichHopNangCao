import { productController } from '../controllers/index.js'
import express from 'express'

let productRoute = express()

productRoute.get('/', productController.getAll)
productRoute.get('/:id', productController.getById)
productRoute.post('/', productController.insert)
productRoute.delete('/:id', productController.remove)
productRoute.put('/:id', productController.update)

export {productRoute}

