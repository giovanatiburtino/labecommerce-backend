import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, purchases, users } from './database'
import { CATEGORY, TProduct, TPurchase, TUser } from './types'

const app = express()

app.use(express.json())
app.use(cors())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        res.send(error.message)
    }
})





app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
})





app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if(q !== undefined){
            if(q.length < 1){
                res.status(400)
                throw new Error ("O campo de pesquisa deve possuir pelo menos um caractere")
            }
        }
    
        const result = products.filter(
            (product) => product.name.toLowerCase().includes(q.toLowerCase())
        )

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
    
        res.send(error.message)
    }
})





app.post('/user', (req: Request, res: Response) => {
    try {
        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if(newId !== undefined){
            if(typeof newId !== "string"){
                throw new Error("'Id' deve ser uma string")
            }
        }

        const usersExists = users.find((user) => user.id === newId)

        if(usersExists){
            throw new Error ("O id de usuário já existe. Insira outro por favor.")
        }

        if(newEmail !== undefined){
            if(typeof newEmail !== "string"){
                throw new Error ("'Email' deve ser uma string")
            }
        }

        const emailExists = users.find((user) => user.email === newEmail)

        if(emailExists){
            throw new Error ("O email inserido já existe. Insira outro por favor.")
        }

        if (!newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido. O email deve conter '@'.")
        }

        const newUser = {
            id: newId,
            email: newEmail,
            password: newPassword
        }

        if(!newUser){
            res.status(404)
            throw new Error ("O campo está vazio")
        }

        users.push(newUser)

        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        res.send(error.message)
    }
})





app.post('/product', (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body as TProduct

        if(id !== undefined){
            if(typeof id !== "string"){
                res.status(400)
                throw new Error ("'Id' deve ser uma string")
            }
        }

        const idExists = products.find((product) => product.id === id)

        if(idExists){
            throw new Error ("O id do produto já existe. Insira outro por favor.")
        }

        if(name !== undefined){
            if(typeof name !== "string"){
                res.status(400)
                throw new Error ("'Name' deve ser uma string")
            }
        }

        if(price !== undefined){
            if(typeof price !== "number"){
                res.status(400)
                throw new Error ("'Price' deve ser um número")
            }
        }

        if(category !== undefined){
            if(category !== CATEGORY.ACESSORIES && CATEGORY.SHOES && CATEGORY.CLOTHES){
                res.status(400)
                throw new Error ("'Category' deve ser Acessories, Shoes ou Clothes")
            }
        }

        const newProduct: TProduct = {
            id: id,
            name: name,
            price: price,
            category: category
        }
    
        products.push(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso")
        
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        res.send(error.message)
    }
})





app.post('/purchases', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body as TPurchase

        if(userId !== undefined){
            if(typeof userId !== "string"){
                res.status(400)
                throw new Error ("O id do usuário deve ser uma string")
            }
        }

        const userIdExists = users.find((user) => user.id === userId)

        if(!userIdExists){
            res.status(404)
            throw new Error ("O id do usuário não foi encontrado.")
        }




        if(productId !== undefined){
            if(typeof productId !== "string"){
                res.status(400)
                throw new Error ("O id do produto deve ser uma string")
            }
        }

        const productIdExists = products.find((product) => product.id === productId)

        if(!productIdExists){
            res.status(404)
            throw new Error ("O id do produto não foi encontrado.")
        }
        



        const unitPrice = totalPrice / quantity

        console.log(unitPrice)

        const priceIsCorrect = products.find((product) => product.price === unitPrice) // verificando se o preço unitário do totalPrice é o mesmo que o preço do produto

        if(!priceIsCorrect){
            res.status(400)
            throw new Error ("O valor total não está batendo com a quantidade.")
        }

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }

        purchases.push(newPurchase)
        
        res.status(201).send("Compra realizada com sucesso")
        
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
})




app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = products.find((product) => product.id === id)

        if(!result){
            res.status(404)
            throw new Error ("Produto não encontrado. Verifique a 'id'.")
        }

        res.status(200).send(result)
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
    
})




app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id 

        const result = purchases.filter((purchase) =>  purchase.userId === id)

        if(result.length < 1){
            res.status(404)
            throw new Error ("Usuário não encontrado. Verifique a 'id'")
        }

        res.status(200).send(result)
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
})




app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const userIndex = users.findIndex((user) => {
            return user.id === id
        })

        if(userIndex < 0){
            res.status(404)
            throw new Error ("Usuário não encontrado. Verifique a id.")
        } else {
            users.splice(userIndex, 1)
            res.status(200).send("Usuário deletado com sucesso")
        }

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
})




app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })

        if(id !== undefined){
            if(productIndex < 0){
                res.status(404)
                throw new Error ("Produto não encontrado. Verifique a id.")
            }
        }

        if(productIndex >= 0){
            products.splice(productIndex, 1)
            res.status(200).send("Produto apagado com sucesso")
        }

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
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
        const newCategory = req.body.category as CATEGORY | undefined
    
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

        if(newCategory !== undefined){
            if(newCategory !== CATEGORY.ACESSORIES && CATEGORY.CLOTHES && CATEGORY.SHOES){
                res.status(400)
                throw new Error ("A categoria do produto deve ser acessories, clothes ou shoes.")
            }
        }
    
        if(productFound){
            productFound.name = newName || productFound.name
            productFound.price = isNaN(newPrice) ? productFound.price : newPrice
            productFound.category = newCategory || productFound.category
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