import { users, products, purchases } from "./database"
import { createUser, createProduct, getAllUsers, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import { CATEGORY } from "./types"

// console.table(users)
// console.table(products)
// console.table(purchases)

console.log(createUser("3", "maria@email.com", "maria12")) 

console.log(getAllUsers(users, "giovana@gmail.com"))

console.table(createProduct("vansSkt05", "Vans Xadrez", 100, CATEGORY.SHOES))

console.log(getAllProducts(products, "Nike Air Force"))

console.log(getProductById("nikeAFC1"))

console.log(queryProductsByName("Nike"))

console.log(createPurchase("3", "vansSkt05", 3, 300))

console.log(getAllPurchasesFromUserId("2"))


