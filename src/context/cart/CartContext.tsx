import { createContext } from "react";

import { ICartProduct } from "@/interfaces";
import { ShippingAdress } from './CartProvider';

interface ContextPros {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    //Methods

    shippingAdress?: ShippingAdress

    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAdress: (adress: ShippingAdress) => void
}

export const CartContext = createContext({} as ContextPros);