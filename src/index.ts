import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, purchases, users } from './database'
import { TProduct, TPurchase, TPurchaseAndProducts, TUser } from './types'
import { db } from './database/knex'

const app = express()

app.use(express.json())
app.use(cors())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})




app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("products")

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})





app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        
        if(q.length < 1){
            res.status(400)
            throw new Error ("O campo de pesquisa deve possuir pelo menos um caractere")
        }
        
        const result = await db.select("*").from("products").whereLike("name", `%${q}%`)

        if(result.length < 1){
            res.status(404)
            throw new Error ("O produto pesquisado não foi encontrado")
        }

        res.status(200).send(result)
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
    
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})





app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, email, name, password } = req.body as TUser

        if (!id || !email || !name || !password) {
            res.status(400)
            throw new Error("Dados inválidos. Verifique se não há nenhum campo em branco.")
        }

        const idExists = await db.select("*").from("users").where({id: id})

        if(idExists.length >= 1){
            res.status(400)
            throw new Error ("O id inserido já existe. Insira outro por favor.")
        }

        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'Id' deve ser um texto.")
        }
        
        
        if(typeof name !== "string"){
            res.status(400)
            throw new Error ("O nome deve ser um texto.")
        }


        if(typeof email !== "string"){
            res.status(400)
            throw new Error ("Email deve ser um texto.")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            res.status(400)
            throw new Error("Parâmetro 'email' inválido. O email deve conter '@'.")
        }
        
        const emailExists = await db.select("*").from("users").where({email: email})

        if(emailExists.length >= 1){
            res.status(400)
            throw new Error ("O email inserido já existe. Insira outro por favor.")
        }


        if(typeof password !== "string"){
            res.status(400)
            throw new Error ("A senha deve ser um texto.")
        }
    

        const newUser: TUser = {
            id: id,
            name: name,
            email: email,
            password: password
        }

        await db("users").insert(newUser)

        res.status(201).send("Usuário cadastrado com sucesso!")

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})





app.post('/product', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body as TProduct

        if(!id || !name || isNaN(price) || !description || !image_url){
            res.status(400)
            throw new Error ("Dados inválidos. Verifique se não há nenhum campo em branco.")
        }

        
        if(typeof id !== "string"){
            res.status(400)
            throw new Error ("'Id' deve ser uma string.")
        }
    
        const idExists = await db.select("*").from("products").where({id: id})

        if(idExists.length >= 1){
            res.status(400)
            throw new Error ("O id do produto já existe. Insira outro por favor.")
        }


        if(typeof name !== "string"){
            res.status(400)
            throw new Error ("O nome deve ser um texto.")
        }
    

        
        if(typeof price !== "number"){
            res.status(400)
            throw new Error ("O Preço deve conter um número.")
        }
        

        if(typeof description !== "string"){
            res.status(400)
            throw new Error ("A descrição do produto deve conter um texto.")
        }
        

        if(typeof image_url !== "string"){
            res.status(400)
            throw new Error ("A url da imagem deve ser um texto.")
        }

        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }

        await db("products").insert(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso!")
        
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})





app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const {id, total_price, buyer_id} = req.body
    
        const [idExists] = await db("purchases").where({id: id})

        if(idExists){
            res.status(400)
            throw new Error ("Id já cadastrado.")
        }

        if(!id || !total_price || !buyer_id){
            res.status(400)
            throw new Error ("Falta adicionar a id, total price ou buyer id")
        }

        const newPurchase = {
            id: id,
            total_price: total_price,
            buyer_id: buyer_id, 
        }


        await db("purchases").insert(newPurchase)

       
        const products: TPurchaseAndProducts[] = await db("purchases_products")

        for(let item of products){
            const newProductsPurchase = {
                purchase_id: id,
                product_id: item.product_id,
                quantity: item.quantity
            }

            await db("purchases_products").insert(newProductsPurchase)

            // const [addItem] = await db("products").where({id: newProductsPurchase.product_id})

            // productsList.push(addItem)
        }

         res.status(201).send({message: "Pedido realizado com sucesso"})

    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})




app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}"
        `)

        if(result.length < 1){
            res.status(404)
            throw new Error ("Produto não encontrado. Verifique a 'id'.")
        }

        res.status(200).send(result)
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})




app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id 
                                     
        const result = await db.select("*").from("users").where({id: id})

        if(result.length < 1){
            res.status(404)
            throw new Error ("Usuário não encontrado. Verifique a id.")
        }

        const isAnyPurchase = await db.select("*").from("purchases").where({buyer_id: id}).andWhere("total_price", ">", 0)

        if(isAnyPurchase.length < 1){
            res.status(404)
            throw new Error ("O usuário não possui nenhuma compra.")
        }

        res.status(200).send(isAnyPurchase)
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id 

        const purchaseExists = await db.select("*").from("purchases").where({id: id})

        if(purchaseExists.length < 1){
            res.status(404)
            throw new Error ("Pedido não encontrado. Verifique a id.")
        }
                                     
        const [ purchase ] = await db("purchases").select(
        "purchases.id AS purchaseId",
        "users.id AS buyerID",
        "users.name AS buyerName",
        "users.email AS buyerEmail", 
        "purchases.total_price AS totalPrice",
        "purchases.created_at AS createdAt",
        "purchases.paid AS paid",
        ).rightJoin("users", "purchases.buyer_id", "=", "users.id").where({"purchases.id": id})


        const [ productsList ] = await db("purchases_products").select(
            "purchases_products.product_id AS id",
            "products.name AS name",
            "products.price AS price",
            "products.description AS description",
            "products.image_url AS imageUrl",
            "purchases_products.quantity AS quantity"
        ).innerJoin("products", "purchases_products.product_id", "=", "products.id").where({"purchases_products.purchase_id": id})

        const result = {...purchase, products: productsList}

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
    
})


app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db.raw(`SELECT * FROM users
                                    WHERE id = "${id}"`)

        if(result.length < 1){
            res.status(404)
            throw new Error ("Usuário não encontrado. Verifique a id.")
        }

        await db.raw(`DELETE FROM users
                                        WHERE id = "${id}"`)

        res.status(200).send({message: "Usuário deletado com sucesso"})

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})




app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db.raw(`SELECT * FROM products
                                     WHERE id = "${id}"`)

        if(result.length < 1){
            res.status(404)
            throw new Error ("Produto não encontrado. Verifique a 'id'.")
        }

        await db.raw(`DELETE FROM products
                    WHERE id = "${id}"`)


        res.status(200).send("Produto deletado com sucesso!")
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})


app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [ result ] = await db.select("*").from("purchases").where({id: idToDelete})

        if (!result) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        await db.delete().from("purchases").where({id: idToDelete})

        res.status(200).send({ message: "Compra deletada com sucesso!" })

    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})




app.put('/user/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id
        const newEmail = req.body.email
        const newPassword = req.body.password

        const userFound = users.find((user) => {
            return user.id === id
        })

        if(!userFound){
            res.status(404)
            throw new Error ("Usuário não encontrado. Verifique a id.")
        }

        if(newId !== undefined){
            if(typeof newId !== "string"){
                res.status(400)
                throw new Error ("O id do usuário deve ser uma string.")
            }
        }

        if(newEmail !== undefined){
            if(typeof newEmail !== "string"){
                res.status(400)
                throw new Error ("O email do usuário deve ser uma string.")
            }
        }

        if (!newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido. O email deve conter '@'.")
        }

        if(newPassword !== undefined){
            if(typeof newPassword !== "string"){
                res.status(400)
                throw new Error ("A senha do usuário deve ser uma string.")
            }
        }
        
        if(userFound){
            userFound.id = newId || userFound.id
            userFound.email = newEmail || userFound.email
            userFound.password = newPassword || userFound.password
        }

        res.status(200).send("Cadastro atualizado com sucesso")
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
})




app.put('/product/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id 

        const newName = req.body.name
        const newPrice = req.body.price 
        const newCategory = req.body.category as string| undefined
    
        const productFound = products.find((product) => product.id === id)

        if(!productFound){
            res.status(400)
            throw new Error ("Produto não encontrado. Verifique a id.")
        }

        if(newName !== undefined){
            if(typeof newName !== "string"){
                res.status(400)
                throw new Error ("O nome do produto deve ser uma string.")
            }
        }

        if(newPrice !== undefined){
            if(typeof newPrice !== "number"){
                res.status(400)
                throw new Error ("O preço do produto deve ser um número.")
            }
        }

        if(productFound){
            productFound.name = newName || productFound.name
            productFound.price = isNaN(newPrice) ? productFound.price : newPrice
        }
    
        res.status(200).send("Produto atualizado com sucesso")
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
})