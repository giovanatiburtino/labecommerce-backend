export type TUser = {
    id: string,
    email: string,
    password: string
}

export enum CATEGORY{
    ACESSORIES = "ACESSORIES",
    CLOTHES = "CLOTHES",
    SHOES = "SHOES"
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORY
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}