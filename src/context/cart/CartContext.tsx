import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextPros {
    cart: ICartProduct[]
    //Methods

    addProductToCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextPros);