import mongoose, { Schema } from "mongoose";

let OrderModel = mongoose.model('Order', new Schema({
        _id: { type: Schema.Types.String },
        fullName: {
                type: Schema.Types.String,
                required: true
        },
        phone: {
                type: Schema.Types.String,
                required: true
        },
        address: {
                type: Schema.Types.String,
                required: true
        },
        products: {
                type: Schema.Types.Array,
                required: true
        },
        status: {
                type: Schema.Types.String
        },
        total: {
                type: Schema.Types.Int32
        }
})
)
export default OrderModel