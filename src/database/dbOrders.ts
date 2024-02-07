import { isValidObjectId } from 'mongoose'

import { db } from '.'
import Order from '@/models/Order'

export const getOrderById = async (id: string) => {

    if(!isValidObjectId(id)) throw new Error('Id inválido')

    await db.connect()
    const order = await Order.findById(id).lean()
    await db.disconnect()

    if(!order) return null

    return JSON.parse(JSON.stringify(order))
}