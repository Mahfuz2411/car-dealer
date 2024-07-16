const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const fixedErrorMssg = {errMssg: "something went wrong."};

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("dealerDB").collection("users");
    const carCollection = client.db("dealerDB").collection("cars");

    app.get('/', async (req,res) => {
      res.send('Hello World');
    });

    app.post('/createuser', async (req,res) => {
      const {name, email, password, img} = req.body;
      if(!name || !email || !password || !img) {
        return res.send(fixedErrorMssg);
      }

      const findUser = await userCollection.findOne({email});
      if(findUser) return res.send({errMssg: "Email already Exists"});
      const userData = {
        name,
        email,
        password,
        img,
        access: "user"
      };
      console.log(userData);
      
      const result = await userCollection.insertOne(userData);
      return res.send(result);
    });

    app.get('/alluser', async (req,res) => {
      //! user should be verified
      const result = await userCollection.find({access: "user"}).toArray();
      res.send(result);
    });

    app.get("/finduser", async (req, res) => {
      const {email, password} = req.headers;
      const result = await userCollection.findOne({email, password});
      if(result) return res.send(result);
      return res.send({errMssg: "User not Found"});
    });

    
    //**************************
    //* cars api start from here
    //**************************

    app.post('/addcar', async(req, res)=>{
      const {img, price, brand, description, status} = req.body;
      if(!img || !price || !brand || !description || !status) {
        return res.send(fixedErrorMssg);
      }
      const newCar = {
        img,
        price,
        brand,
        description,
        status
      }
      const result = await carCollection.insertOne(newCar);
      return res.send(result);
    });

    app.put('/car/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const {img, price, brand, description, status} = req.body;

      if(!img || !price || !brand || !description || !status) {
        res.send(fixedErrorMssg);
        return;
      }

      const setCar = {
        $set: {
          img,
          price,
          brand,
          description,
          status
        }
      }
      const result = await carCollection.updateOne(filter, setCar, options);
      res.send(result);
    });

    app.get("/carlist", async (req, res) => {
      //! user should be verified
      const carlist = await carCollection.find().sort({_id: -1}).toArray();
      return res.send(carlist);
    });

    app.delete("/deletecar/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await carCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/car/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await carCollection.findOne(query);
      return res.send(result);
    });




    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });

    
  } catch (error) {
    res.send(fixedErrorMssg);
    console.log(error);
  }
}
run().catch(console.dir);
