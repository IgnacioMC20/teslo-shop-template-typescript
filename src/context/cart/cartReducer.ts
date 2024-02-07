import { CartState } from './CartProvider'
import { ICartProduct, ISummary, ShippingAddress } from '@/interfaces'

type CartActionType =
    | { type: '[Cart] - LoadCartFromCookies', payload: ICartProduct[] }
    | { type: '[Cart] - UpdateProductsInCart', payload: ICartProduct[] }
    | { type: '[Cart] - UpdateQuantity', payload: ICartProduct }
    | { type: '[Cart] - RemoveProduct', payload: ICartProduct }
    | { type: '[Cart] - UpdateCartSummary', payload: ISummary }
    | { type: '[Cart] - LoadAddressFromCookies', payload: ShippingAddress }
    | { type: '[Cart] - UpdateAddress', payload: ShippingAddress }
    | { type: '[Cart] - OrderComplete' }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCartFromCookies':
            return {
                ...state,
                cart: [...action.payload],
                isLoaded: true
            }

        case '[Cart] - UpdateProductsInCart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - RemoveProduct':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

        case '[Cart] - UpdateQuantity':
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product._id === action.payload._id && product.size === action.payload.size) {
                        return action.payload
                    }
                    return product
                })
            }

        case '[Cart] - UpdateCartSummary':
            return {
                ...state,
                ...action.payload
            }

        case '[Cart] - UpdateAddress':    
        case '[Cart] - LoadAddressFromCookies':
            return{
                ...state,
                shippingAddress: action.payload
            }

        case '[Cart] - OrderComplete':
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                total: 0,
                tax: 0,
                subTotal: 0,
            }
        default:
            return state
    }
}