
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextAuth]'
import { db } from '@/database'
import { IOrder } from '@/interfaces'
import { Product } from '@/models'
import Order from '@/models/Order'

type Data = { message: string } | IOrder;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

    async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

        const { orderItems, total } = req.body as IOrder
        const session: any = await getServerSession(req, res, authOptions)
        if (!session) return res.status(401).json({ message: 'Debes estar autenticado para hacer esto' })

        const productIds = orderItems.map(item => item._id)
        await db.connect()

        const dbProducts = await Product.find({ _id: { $in: productIds } })

        try {
            const subTotal = orderItems.reduce((prev, current) => {

                const currentPrice = dbProducts.find(product => product._id.toString() === current._id.toString())?.price
                if(!currentPrice) throw new Error('Verifique el carrito de nuevo :(')
                return (current.price * current.quantity) + prev
            }, 0)

            const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
            const backendTotal = subTotal * (taxRate + 1)

            if(total !== backendTotal) throw new Error('El total no cuadra con el monto :(')

            // todo bien hasta aquí, ahora a crear la orden
            const userId = session.user._id
            const newOrder = new Order({ ...req.body, isPaid: false, user: userId})
            await newOrder.save()

            return res.status(201).json(newOrder)
            
        } catch (error: any) {
            await db.disconnect()
            console.log(error)
            res.status(400).json({ message: error.message || 'Error al procesar la orden, revise los logs del servidor' })
        }

        return res.status(200).json(session)
    }
}
