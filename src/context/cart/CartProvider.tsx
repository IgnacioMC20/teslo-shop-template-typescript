import Cookie from 'js-cookie'
import Cookies from 'js-cookie'
import { FC, useEffect, useReducer } from 'react'

import { CartContext, cartReducer } from '.'
import { tesloApi } from '@/api'
import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces'

export interface CartState {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    shippingAddress?: ShippingAddress
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            //todo: cargar productos por id desde la bd
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCartFromCookies', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCartFromCookies', payload: [] })
        }
    }, [])

    useEffect(() => {
        if (Cookies.get('firstName')) {
            dispatch({ type: '[Cart] - LoadAddressFromCookies', payload: getAddressFromCookies() })
        }
    }, [])

    useEffect(() => {
        //todo: guardar solo los ids
        Cookie.set('cart', JSON.stringify(state.cart))
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

    const getAddressFromCookies = (): ShippingAddress => {
        return {
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            zipCode: Cookies.get('zipCode') || '',
            city: Cookies.get('city') || '',
            country: Cookies.get('country') || '',
            department: Cookies.get('department') || '',
            phone: Cookies.get('phone') || '',
        }
    }

    //Methods
    const addProductToCart = (product: ICartProduct) => {

        // ? si el producto no existe en el cart, lo agregamos
        const productInCart = state.cart.some(p => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - UpdateProductsInCart', payload: [...state.cart, product] })

        // ? existe pero tiene diferente tall, entonces se agrega
        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - UpdateProductsInCart', payload: [...state.cart, product] })

        // ? 
        const updatedProducts = state.cart.map(p => {
            //validaciones extra
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p

            //actualizar la cantidad
            p.quantity += product.quantity
            return p
        })
        dispatch({ type: '[Cart] - UpdateProductsInCart', payload: updatedProducts })
    }

    const updateCartQuantity = (product: ICartProduct) => (dispatch({ type: '[Cart] - UpdateQuantity', payload: product }))
    const removeCartProduct = (product: ICartProduct) => (dispatch({ type: '[Cart] - RemoveProduct', payload: product }))

    const updateAddress = (address: ShippingAddress) => {
        Cookies.set('firstName', address.firstName)
        Cookies.set('lastName', address.lastName)
        Cookies.set('address', address.address)
        Cookies.set('zipCode', address.zipCode)
        Cookies.set('city', address.city)
        Cookies.set('country', address.country)
        Cookies.set('department', address.department)
        Cookies.set('phone', address.phone)
        dispatch({ type: '[Cart] - UpdateAddress', payload: address })
        return
    }

    const createOrder = async (): Promise<{hasError: boolean, message: string}> => {

        if (!state.shippingAddress) throw new Error('No se ha ingresado la dirección de envío')

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                _id: p._id!,
                title: p.title!,
                quantity: p.quantity!,
                slug: p.slug!,
                image: p.image!,
                price: p.price!,
                gender: p.gender!,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
        }
        
        try {
            const response = await tesloApi({
                url: '/orders',
                method: 'POST',
                data: body
            })

            const { _id }: IOrder = await response.json()

            dispatch({ type: '[Cart] - OrderComplete'})

            return {
                hasError: false,
                message: _id!
            }

        } catch (error) {
            return {
                hasError: true,
                message: `Error al crear la orden ${error}` 
            }
        }
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,

            //Orders
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    )
}