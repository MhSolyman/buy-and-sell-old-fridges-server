const express = require('express');
const app = express()
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { query } = require('express');
const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kmh2g.mongodb.net/?retryWrites=true&w=majority`;
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

            const result = await productsCollection.insertOne(user);
            res.send(result)


            const categories = await categoriesCollection.findOne(query)

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
            const email = user.email
            const query = { email: email }
            const find = await userCullection.findOne(query);
            console.log(find)
            if (find === null) {
                const dataInsert = await userCullection.insertOne(user);
                res.send(dataInsert)

            }



        })
        app.get('/products/:email', async (req, res) => {
            const email = req.params.email;

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
        app.get('/sellers', async (req, res) => {
            const query = { userType: "seller" };
            const result = await userCullection.find(query).toArray()

            res.send(result)
        })
        app.get('/buyers', async (req, res) => {
            const query = { userType: "buyer" };
            const result = await userCullection.find(query).toArray()
            console.log(result)
            res.send(result)
        })

        //veryfy api make
        app.put('/veryfy/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    veryfy: 'veryfy'
                }
            }
            const result = await userCullection.updateOne(filter, updatedDoc, options)
            res.send(result)

        })

        app.delete('/Deleteuser/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCullection.deleteOne(query);
            res.send(result)

        })
        // one pproduct get
        app.get('/oneproduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.findOne(query);
            res.send(result)
        })
        //
        app.put('/advatize/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    advatize: 'advatize'
                }
            }
            const result = await productsCollection.updateOne(filter, updatedDoc, options)
            res.send(result)

        })


        app.get('/allproduct', async (req, res) => {
            const query = { advatize: 'advatize' };
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })


        app.delete('/DeleteMyprodut/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(id)
            const result = await productsCollection.deleteOne(query);
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