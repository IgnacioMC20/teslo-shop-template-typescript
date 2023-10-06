import { createContext } from 'react'

import { ICartProduct, ShippingAddress } from '@/interfaces'

interface ContextPros {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    //Methods

    shippingAddress?: ShippingAddress

    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: ShippingAddress) => void

    //Orders 
    createOrder: () => void
}

export const CartContext = createContext({} as ContextPros)