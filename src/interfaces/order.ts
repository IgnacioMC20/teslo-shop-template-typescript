import { IUser } from "./user";

export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAdress: ShippingAdress;
    paymentResult?: string;
    
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    isPaid: boolean;
    paidAt?: string;
}

export interface IOrderItem {
    _id: string;
    title: string;
    size: string;
    quantity: number;
    slug: string;
    imgae: string;
    price: number;
}

export interface ShippingAdress {
    firstName: string;
    lastName: string;
    adress: string;
    zipCode: string;
    city: string;
    country: string;
    department: string;
    phone: string;
}