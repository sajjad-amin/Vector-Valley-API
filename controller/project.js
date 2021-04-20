const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI;

const addProjectPhoto = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    const file = req.files.projectImage;
    const iconData = file.data.toString('base64');
    const image = {
        contentType: file.mimetype,
        size: file.size,
        imgData: iconData
    }
    DBClient.connect(err=>{
        const service = DBClient.db("vector-valley").collection("project_images");
        service.insertOne({image}).then(result=>{
            res.json({
                uploaded: result.insertedCount > 0
            })
            DBClient.close(true)
        }).catch(r=>{
          DBClient.close(true)
        })
    })
  };

  const getProjectPhoto = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    DBClient.connect(err=>{
        const service = DBClient.db("vector-valley").collection("project_images");
        service.find({}).toArray((err, data) => {
            res.send(data)
            DBClient.close(true)
        })
    })
  }

  const deleteProjectPhoto = (req, res) => {
    const DBClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    DBClient.connect(err=>{
        const service = DBClient.db("vector-valley").collection("project_images");
        const id = req.params.id;
        service.deleteOne({_id: ObjectId(id)})
        .then((r=>{
            res.json({deleted: r.deletedCount > 0})
            DBClient.close(true)
        })).catch(r=>{
          DBClient.close(true)
        })
    })
  }

  module.exports = {
      addProjectPhoto,
      getProjectPhoto,
      deleteProjectPhoto
  }