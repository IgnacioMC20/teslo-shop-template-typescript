import { ICartProduct, ISummary } from '@/interfaces';
import { CartState } from './CartProvider';

type CartActionType = 
    | { type: '[Cart] - LoadCartFromCookies', payload: ICartProduct[] }
    | { type: '[Cart] - UpdateProductsInCart', payload: ICartProduct[] }
    | { type: '[Cart] - UpdateQuantity', payload: ICartProduct }
    | { type: '[Cart] - RemoveProduct', payload: ICartProduct }
    | { type: '[Cart] - UpdateCartSummary', payload: ISummary }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCartFromCookies':
            return {
                ...state,
            };
        
        case '[Cart] - UpdateProductsInCart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - RemoveProduct':
            return {
                ...state,
                cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

        case '[Cart] - UpdateQuantity':
            return {
                ...state,
                cart: state.cart.map((product) => {
                  if(product._id === action.payload._id && product.size === action.payload.size){
                    return action.payload;
                  }
                  return product;
                })
            }

        case '[Cart] - UpdateCartSummary':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}