const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { query } = require('express');
const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://MhSolyman:S1yZIov9LhidqeAZ@cluster0.kmh2g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const productsCollection = client.db('categories').collection('products')
        const userCullection = client.db('users').collection('user')
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })

        app.post('/product', async (req, res) => {
            const user = req.body;
            const name = user.name;
            const query = { name: name }
            console.log(name)
            const result = await productsCollection.insertOne(user);
            res.send(result)


            const categories = await categoriesCollection.findOne(query)
            console.log(categories)
            if (categories === null) {
                const categoriesTwo = await categoriesCollection.insertOne(query);
                console.log("nai")

            } else {
                console.log('asa')

            }

        })

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await categoriesCollection.findOne(query)
            const nameRe = result.name;
            const queryTwo = { name: nameRe }
            const resultTwo = await productsCollection.find(queryTwo).toArray()
            res.send(resultTwo)

        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCullection.insertOne(user);
            res.send(result)

        })
        app.get('/products/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email)
            const query = { email }
            const result = await productsCollection.find(query).toArray();
            res.send(result)

        })
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;

            const query = { email };
            const result = await userCullection.findOne(query)
            res.send(result)
        })
        app.get('/seller', async (req, res) => {
            const query = { userType:"seller"};
            const result = await userCullection.find(query).toArray()
           console.log(result)
            res.send(result)
        })
        app.get('/buyer', async (req, res) => {
            const query = { userType:"buyer"};
            const result = await userCullection.find(query).toArray()
           console.log(result)
            res.send(result)
        })

    }
    finally {



    }



}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('hoisa ra vhi')

})


app.listen(port, () => {
    console.log('server port', port)
})