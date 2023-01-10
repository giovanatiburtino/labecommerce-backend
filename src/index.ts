import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, purchases, users } from './database'
import { TProduct, TPurchase, TUser } from './types'

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