const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI;

const bookService = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("booking");
    service
      .insertOne(req.body)
      .then((result) => {
        res.json({
          uploaded: result.insertedCount > 0,
        });
        DBClient.close(true);
      })
      .catch((err) => {
        DBClient.close(true);
      });
  });
};

const getAllBookings = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("booking");
    service.find({}).toArray((err, data) => {
      res.send(data);
      DBClient.close(true);
    });
  });
};

const getBookings = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("booking");
    const userID = req.params.userID;
    service.find({ customerID: userID }).toArray((err, data) => {
      res.json(data);
      DBClient.close(true);
    });
  });
};

const changeBookingStatus = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("booking");
    const id = req.body.id;
    const status = req.body.status;
    service
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: { status: status },
        }
      )
      .then((r) => {
        res.json({ updated: r.modifiedCount === 1 });
        DBClient.close(true);
      })
      .catch((r) => {
        DBClient.close(true);
      });
  });
};

const deleteBooking = (req, res) => {
  const DBClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  DBClient.connect((err) => {
    const service = DBClient.db("vector-valley").collection("booking");
    const id = req.params.id;
    service
      .deleteOne({ _id: ObjectId(id) })
      .then((r) => {
        res.json({ deleted: r.deletedCount > 0 });
        DBClient.close(true);
      })
      .catch((r) => {
        DBClient.close(true);
      });
  });
};

module.exports = {
  bookService,
  getAllBookings,
  getBookings,
  changeBookingStatus,
  deleteBooking,
};
