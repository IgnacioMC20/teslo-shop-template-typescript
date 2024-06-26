import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'

type Data = { message: string } | IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)

        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let { q = '' } = req.query

    if (q.length === 0) return res.status(400).json({ message: 'Debe ingresar la busqueda' })

    const searchString = q.toString().toLowerCase()

    await db.connect()
    console.log(searchString)

    const products = await Product.find({
        $text: { $search: searchString }
    }).lean()

    await db.disconnect()

    return res.status(200).json(products)
}
