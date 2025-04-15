import mongoose, {Schema } from 'mongoose'

const ProductModel = mongoose.model('Product', new Schema({
        _id: { type: Number },
        name: {
                type: Schema.Types.String,
                required: true
        },
        price: {
                type: Schema.Types.Int32,
                required: true
        },
        specialPrice: {
                type: Schema.Types.Int32
        },
        rating: {
                type: Schema.Types.Int32 // 1 -> 5
        }
})) 
export default ProductModel