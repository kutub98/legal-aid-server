const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;

//use of MiddleWare
app.use(cors());
app.use(express.json());
require("dotenv").config();

// mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.get("/", (req, res) => {
  res.send("legal aid is ready to run");
});

const uri = `mongodb+srv://${process.env.SITE_NAME}:${process.env.SECRET_KEY_OF_lEGAL_AID}@cluster0.mlxcjcs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const allLegalServices = client.db("legalAid").collection("legalServices");
const allReviews = client.db("LegalAidReviews").collection("allReviews");
async function run() {
  try {
    await client.connect();
    console.log("Mongo has connected");
  } catch (error) {
    console.log(error.name, error.message);
  }
}

// getting all Services
app.get("/services", async (req, res) => {
  const query = {};
  const cursor = allLegalServices.find(query);
  const services = await cursor.toArray();
  // console.log(services)
  res.send(services);
});



app.get("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const getServiceByID = await allLegalServices.findOne(query);
  console.log(getServiceByID);
  res.send(getServiceByID);
});

app.post("/allReviews", async (req, res) => {
  const PostingReview = req.body;
  const getReview = await allReviews.insertOne(PostingReview);
  console.log(getReview);
  res.send(getReview);
});

app.get("/allReviews", async (req, res) => {
  const query = {};
  const cursor = allReviews.find(query);
  const getAllReview = await cursor.toArray();
  // console.log(services)
  res.send(getAllReview);
});
app.get("/allReviews/:id", async (req, res) => {
  const id = req.params.id;
  const getReviewsById = await allReviews.findOne(query);
  const query = { _id: ObjectId(id) };
  console.log(getReviewsById);
  res.send(getReviewsById);
});








run().catch((error) => console.error(error));

app.listen(port, (req, res) => {
  console.log(`Legal aid service has been started ${port}`);
});
