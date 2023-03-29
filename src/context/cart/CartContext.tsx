import { createContext } from "react";

import { ICartProduct } from "@/interfaces";

interface ContextPros {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    //Methods

    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextPros);