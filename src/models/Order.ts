import mongoose, { model, Schema, Model } from 'mongoose'

import { IOrder } from '@/interfaces'

const orderSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        _id: { type: String, required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        department: { type: String, required: true },
        phone: { type: String, required: true },
    },
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },

    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String }
}, {
    timestamps: true
})

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema)

export default Order
