import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IUserApi } from '@/interfaces'
import { User } from '@/models'
import { jwt } from '@/utils'

type Data = {
    message?: string
    token?: string
    user?: IUserApi
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res)
    
        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {email = '', password = '' } = req.body

    await db.connect()
    const user = await User.findOne({email})
    await db.disconnect()

    if(!user) return res.status(400).json({
        message: 'Correo o contraseña no validos - Email'
    })

    if(!bcrypt.compareSync(password, user.password!)) return res.status(400).json({
        message: 'Correo o contraseña no validos - contra'
    })

    const { role, name, _id } = user

    return res.status(200).json({
       token: jwt.signToken(_id),
       user: { email, role, name}
    })
}