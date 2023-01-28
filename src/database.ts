import { TUser } from "./types";
import { TProduct } from "./types";
import { TPurchase } from "./types";

export const users: TUser[] = [
    {
        id: '1',
        name: "gio",
        email: 'giovana@gmail.com',
        password: '031101'   
    },
    {
        id: "2",
        name: "ane",
        email: "ana@gmail.com",
        password: "010101"
    }
]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Apple Watch",
        price: 250,
        description: "relógio apple",
        image_url: "hfuehuefhufehu"   
    }
]

export const purchases: TPurchase[] = [
    {
        id: "pur01",
        buyer_id: "nikeAFC1",
        total_price: 100,
    }
]
