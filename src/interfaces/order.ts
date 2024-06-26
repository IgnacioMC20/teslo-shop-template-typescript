import { ISize } from './products'
import { IUser } from './user'

export interface IOrder {
    _id?: string
    user?: IUser | string
    orderItems: IOrderItem[]
    shippingAddress: ShippingAddress
    paymentResult?: string

    numberOfItems: number
    subTotal: number
    tax: number
    total: number

    isPaid: boolean
    paidAt?: string
}

export interface IOrderItem {
    _id: string
    title: string
    size: ISize
    quantity: number
    slug: string
    image: string
    price: number
    gender: 'men'|'women'|'kid'|'unisex'
}

export interface ShippingAddress {
    firstName: string
    lastName: string
    address: string
    zipCode: string
    city: string
    country: string
    department: string
    phone: string
}