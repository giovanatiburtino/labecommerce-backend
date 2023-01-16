import { TUser } from "./types";
import { TProduct } from "./types";
import { TPurchase } from "./types";
import { CATEGORY } from "./types";

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
        id: "p001",
        name: "Apple Watch",
        price: 250,
        category: CATEGORY.ACESSORIES
    },
    {
        id: "p002",
        name: "Nike Air Force",
        price: 130,
        category: CATEGORY.SHOES
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "1",
        productId: "nikeAFC1",
        quantity: 3,
        totalPrice: 390
    },
    {
        userId: "2",
        productId: "AppWatc1",
        quantity: 2,
        totalPrice: 500
    }
]
