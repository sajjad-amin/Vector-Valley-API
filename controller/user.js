const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI;

const addUser = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("user");
    const email = req.body.email;
    service.find({ email: email }).toArray((err, data) => {
      if (data.length === 0) {
        //do something
        service.insertOne(req.body).then((r) => {
          if (r.insertedCount === 1) {
            res.send(r.ops);
          }
          DBClient.close(true);
        });
      } else {
        res.send(data);
        DBClient.close(true);
      }
    });
  });
};

const getAllUser = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err)=>{
    const service = DBClient.db("vector-valley").collection("user");
    service.find({}).toArray((err, data) => {
        res.send(data)
        DBClient.close(true)
    })
})
}

const makeAdmin = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("user");
    const email = req.body.email;
    const admin = req.body.admin;
    service.updateOne({ email: email},{
        $set: {admin : admin}
    })
    .then(r=>{
        res.json({updated: r.modifiedCount === 1})
        DBClient.close(true)
    }).catch(()=>{
      DBClient.close(true)
    })
  });
};

module.exports = {
  addUser,
  getAllUser,
  makeAdmin
};
