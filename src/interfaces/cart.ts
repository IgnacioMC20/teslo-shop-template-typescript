import { ISize } from ".";

export interface ICartProduct {
    _id?: string;
    image: string;
    price: number;
    size: ISize;
    inStock: number
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex'
    quantity: number
}

export interface ISummary{
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
}
