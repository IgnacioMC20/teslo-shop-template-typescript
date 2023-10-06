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
    return checkJWT(req, res)
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies

    let userId = ''

    try {
        userId = await jwt.isValidtoken(token)
    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorizacion no es valido'
        })
    }

    await db.connect()
    const user = await User.findById(userId).lean()
    await db.disconnect()

    if (!user) return res.status(400).json({
        message: 'No existe usuario con ese id'
    })

    // if(!bcrypt.compareSync(password, user.password!)) return res.status(400).json({
    //     message: 'Correo o contraseña no validos - contra'
    // })

    const { role, name, _id, email } = user

    return res.status(200).json({
        token: jwt.signToken(_id),
        user: { email, role, name }
    })
}

