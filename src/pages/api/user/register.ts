import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IUserApi } from '@/interfaces'
import { User } from '@/models'
import { jwt, validations } from '@/utils'

type Data = {
    message?: string
    token?: string
    user?: IUserApi
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res)

        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}
// Todo: hacer mas validaciones
const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '', name = '' } = req.body
    console.log({email, password, name})
    
    if (password.length < 5) {
        return res.status(400).json({
            message: 'La contraseña debe ser mas de 5 caracteres'
        })
    }
    
    if (name.length < 2) {
        return res.status(400).json({
            message: 'La contraseña debe ser mas de 5 caracteres'
        })
    }

    if(!validations.isValidEmail(email)){
        return res.status(400).json({
            message: 'El correo no es valido'
        })
    }

    await db.connect()
    const user = await User.findOne({ email })
    
    if (user) {
        await db.disconnect()
        return res.status(400).json({
            message: 'El correo electronico ya existe'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name
    })

    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    const { _id, role } = newUser

    return res.status(200).json({
        token: jwt.signToken(_id),
        user: {
            email,
            role,
            name
        }
    })
}
