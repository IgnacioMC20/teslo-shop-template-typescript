import { CartState } from '@/context'
import { ShippingAddress } from '@/interfaces'

const baseUrl = '/api'

interface User {
    email?: string
    password?: string
    name?: string
    token?: string
}
interface Order {
    cart: CartState
    address: ShippingAddress
}
interface Props {
    url: string
    method?: Action
    data?: User | any // todo: add order types
}

type Action = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const tesloApi = async ({ url, method = 'GET', data }: Props) => {

    if(method == 'GET') return await fetch(baseUrl + url)
    else{
        const response = await fetch(baseUrl + url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response
    }
}
