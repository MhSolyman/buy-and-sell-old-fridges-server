const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const cors = require('cors')
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

        app.get('/category/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id: ObjectId(id)}
            const result = await categoriesCollection.findOne(query)
            const nameRe=result.name;
            const queryTwo= {name:nameRe}
            const resultTwo = await productsCollection.find(queryTwo).toArray()
            res.send(resultTwo)

        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCullection.insertOne(user);
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