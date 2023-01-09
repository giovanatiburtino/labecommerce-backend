import { TUser } from "./types";
import { TProduct } from "./types";
import { TPurchase } from "./types";

export const users: TUser[] = [
    {
        id: '1',
        email: 'giovana@gmail.com',
        password: '031101'   
    },
    {
        id: "2",
        email: "ana@gmail.com",
        password: "010101"
    }
]

export const products: TProduct[] = [
    {
        id: "shampoo1",
        name: "Shampoo",
        price: 40,
        category: "higiene"
    },
    {
        id: "creme1",
        name: "Creme",
        price: 25,
        category: "higiene"
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "1",
        productId: "creme1",
        quantity: 2,
        totalPrice: 50
    },
    {
        userId: "2",
        productId: "shampoo1",
        quantity: 2,
        totalPrice: 80
    }
]