import { NextApiRequest, NextApiResponse } from 'next'

import { db, initialData } from '@/database'
import { Department, Product, User } from '@/models'

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production'){
        return res.status(401).json({message: 'No tiene acceso a este servicio'})
    }

    await db.connect()

    await User.deleteMany()
    await User.insertMany( initialData.users )

    await Department.deleteMany()
    await Department.insertMany(initialData.departments)

    await Product.deleteMany()
    await Product.insertMany( initialData.products )

    await db.disconnect()

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}