export interface IUser {
    name: string
    email: string
    password: string
    role: ValidRoles
}

type ValidRoles = 'admin' | 'client'