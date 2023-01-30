export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
    id: string,
    buyer_id: string,
    total_price: number,
    products: TPurchaseAndProducts[]
}

export type TPurchaseAndProducts = {
    purchase_id: string,
    product_id: string
    quantity: number
}