const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI;

const addService = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  const title = req.body.title;
  const description = req.body.description;
  const file = req.files.icon;
  const iconData = file.data.toString('base64');
  const icon = {
      contentType: file.mimetype,
      size: file.size,
      icon: iconData
  }
  DBClient.connect(err=>{
      const service = DBClient.db("vector-valley").collection("service");
      service.insertOne({title, description,icon}).then(result=>{
          res.json({
              uploaded: result.insertedCount > 0
          })
          DBClient.close(true)
      }).catch(()=>{
          DBClient.close(true)
      })
  })
};

const getServices = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    DBClient.connect(err=>{
        const service = DBClient.db("vector-valley").collection("service");
        service.find({}).toArray((err, data) => {
            res.send(data)
            DBClient.close(true)
        })
    })
}

const deleteService = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    DBClient.connect(err=>{
        const service = DBClient.db("vector-valley").collection("service");
        const id = req.params.id;
        service.deleteOne({_id: ObjectId(id)})
        .then((r=>{
            res.json({deleted: r.deletedCount > 0})
            DBClient.close(true)
        })).catch(()=>{
            DBClient.close(true)
        })
    })
}

const findService = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    DBClient.connect(err=>{
        const service = DBClient.db("vector-valley").collection("service");
        const id = req.params.id;
        service.find({_id: ObjectId(id)}).toArray((err, data) => {
            res.send(data)
            DBClient.close(true)
        })
    })
}

module.exports = {
  addService,
  getServices,
  deleteService,
  findService
};
