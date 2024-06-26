import type { NextApiRequest, NextApiResponse } from 'next'

import { SHOP_CONSTANTS, db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'

type Data = { message: string } | IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)

        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { gender = 'all' } = req.query
    let condition = {}

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender }
    }

    await db.connect()
    const products = await Product.find(condition).select('images inStock price slug title -_id').lean()
    await db.disconnect()

    return res.status(200).json(products)
}
