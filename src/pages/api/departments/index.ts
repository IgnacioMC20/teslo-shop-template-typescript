import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IDepartment } from '@/interfaces'
import { Department } from '@/models'

type Data = { message: string } |  {departments: IDepartment[]}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    try {
        await db.connect()
        const departments = await Department.find().select('title code').lean()
        await db.disconnect()
        
        if(!departments) return res.status(401).json({message: 'No hay departamentos'})

        return res.status(200).json({departments})
    } catch (error) {
        await db.disconnect()
        return res.status(500).json({message: 'Algo salio mal'})
    }

}