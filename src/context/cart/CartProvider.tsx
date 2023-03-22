import { FC, useEffect, useReducer } from "react";
import { ICartProduct } from "@/interfaces";
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'

export interface CartState {
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
}

const CART_INITIAL_STATE: CartState = {
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}

export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            //todo: cargar productos por id desde la bd
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[Cart] - LoadCartFromCookies', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCartFromCookies', payload: [] });
        }
    }, [])

    useEffect(() => {
        //todo: guardar solo los ids
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])


    useEffect(() => {
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
        const orderSummary = {
            numberOfItems: state.cart.reduce((prev, current) => current.quantity + prev, 0),
            subTotal,
            tax: subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0),
            total: subTotal * (Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) + 1)
        }
        dispatch({ type: '[Cart] - UpdateCartSummary', payload: orderSummary })
    }, [state.cart])

    //Methods
    const addProductToCart = (product: ICartProduct) => {

        // ? si el producto no existe en el cart, lo agregamos
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - UpdateProductsInCart', payload: [...state.cart, product] });

        // ? existe pero tiene diferente tall, entonces se agrega
        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - UpdateProductsInCart', payload: [...state.cart, product] });


        // ? 
        const updatedProducts = state.cart.map(p => {
            //validaciones extra
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            //actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });
        dispatch({ type: '[Cart] - UpdateProductsInCart', payload: updatedProducts });
    }

    const updateCartQuantity = (product: ICartProduct) => (dispatch({ type: '[Cart] - UpdateQuantity', payload: product }))
    const removeCartProduct = (product: ICartProduct) => (dispatch({ type: '[Cart] - RemoveProduct', payload: product }))


    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}