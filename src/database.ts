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
        id: "AppWatc1",
        name: "Apple Watch",
        price: 250,
        category: CATEGORY.ACESSORIES
    },
    {
        id: "nikeAFC1",
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




export function createUser(id: string, email: string, password: string): TUser[] {
    const userToAdd = {
        id: id,
        email: email,
        password: password
    }

    const newUser = [...users, userToAdd]

    console.log("Cadastro realizado com Sucesso")

    return newUser
  }



 export function getAllUsers(users: TUser[], emailInformado: string | undefined): TUser[] {
    return users.filter(
      (user) => {
        return user.email === emailInformado
      }
    )
  }



export function createProduct(id: string, name: string, price: number, category: CATEGORY): TProduct[]{
    const productToAdd = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    const newProduct = [...products, productToAdd]

    return newProduct
}



export function getAllProducts(products: TProduct[], productInfo: string | undefined): TProduct[] {
    return products.filter(
      (product) => {
        return product.name === productInfo
      }
    )
}



export function getProductById(idToSearch: string | undefined): TProduct[]{
    return products.filter(
      (product) => {
        return product.id === idToSearch
      }
    )
}



export function queryProductsByName(q: string): TProduct[]{
    return products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
}



export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): TPurchase[]{
    const purchaseToAdd = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }

    const newPurchase = [...purchases, purchaseToAdd]

    return newPurchase
}



export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[]{
    return purchases.filter((purchase) => {
        return purchase.userId === userIdToSearch
    })
}
