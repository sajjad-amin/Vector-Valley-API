const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI;

const postReview = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("review");
    service.insertOne(req.body).then((result) => {
      res.json({
        done: result.insertedCount > 0,
      });
      DBClient.close(true)
    }).catch(r=>{
      DBClient.close(true)
    })
  });
};

const getAllReview = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("review");
    service.find({}).toArray((err, data) => {
      res.send(data);
      DBClient.close(true)
    });
  });
};

const deleteReview = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("review");
    const id = req.params.id;
    service.deleteOne({ _id: ObjectId(id) }).then((r) => {
      res.json({ deleted: r.deletedCount > 0 });
      DBClient.close(true)
    }).catch(r=>{
      DBClient.close(true)
    })
  });
};

module.exports = {
  postReview,
  getAllReview,
  deleteReview,
};
