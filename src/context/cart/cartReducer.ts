import { ICartProduct } from '@/interfaces';
import { CartState } from './CartProvider';

type CartActionType = 
    | { type: '[Cart] - LoadCartFromCookies', payload: ICartProduct[] }
    | { type: '[Cart] - UpdateProductsInCart', payload: ICartProduct[] }

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
        default:
            return state;
    }
}