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

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter(
        (product) => product.name.toLowerCase().includes(q.toLowerCase())
    )

    res.status(200).send(result)
})


app.post('/user', (req: Request, res: Response) => {

    const { id, email, password } = req.body as TUser

    const newUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/product', (req: Request, res: Response) => {
    
    const { id, name, price, category } = req.body as TProduct

    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchases', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    
    res.status(201).send("Compra realizada com sucesso")
})



app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
})



app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id 

    const result = purchases.filter((purchase) =>  purchase.userId === id)

    res.status(200).send(result)
})



app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })

    if(userIndex >= 0){
        users.splice(userIndex, 1)
        res.status(200).send("Usuário deletado com sucesso")
    } else {
        res.send("Usuário não encontrado")
    }
})

app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const productIndex = products.findIndex((product) => {
        return product.id === id
    })

    if(productIndex >= 0){
        products.splice(productIndex, 1)
        res.status(200).send("Produto apagado com sucesso")
    } else {
        res.send("Produto não encontrado")
    }
})


app.put('/user/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const userFound = users.find((user) => {
        return user.id === id
    })
    
    if(userFound){
        userFound.id = newId || userFound.id
        userFound.email = newEmail || userFound.email
        userFound.password = newPassword || userFound.password
    }

    res.status(200).send("Cadastro atualizado com sucesso")
})

app.put('/product/:id', (req: Request, res: Response) => {
    const id = req.params.id 

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY | undefined

    const productFound = products.find((product) => product.id === id)

    if(productFound){
        productFound.name = newName || productFound.name
        productFound.price = isNaN(newPrice) ? productFound.price : newPrice
        productFound.category = newCategory || productFound.category
    }

    res.status(200).send("Produto atualizado com sucesso")
})