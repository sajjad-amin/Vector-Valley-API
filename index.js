require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require("cors");
const {addService, getServices, deleteService, findService} = require("./controller/service");
const {addUser, makeAdmin, getAllUser} = require('./controller/user');
const { addProjectPhoto, getProjectPhoto, deleteProjectPhoto } = require('./controller/project');
const {bookService, getBookings, getAllBookings, changeBookingStatus, deleteBooking} = require('./controller/booking');
const { postReview, getAllReview, deleteReview } = require('./controller/review');

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '50mb'}));
app.use(express.json());
app.use(fileUpload());
//services
app.get("/services", getServices);
app.post("/addservice", addService);
app.delete("/deleteservice/:id", deleteService);
app.get('/searchservice/:id', findService);
//booking
app.get('/bookings/:userID', getBookings);
app.get('/allbookings', getAllBookings);
app.post('/bookservice', bookService);
app.put('/bookingchange', changeBookingStatus);
app.delete('/deletebooking/:id', deleteBooking);
//user
app.get('/alluser', getAllUser);
app.post('/adduser', addUser);
app.put('/makeadmin', makeAdmin);
//review
app.get('/getallreview', getAllReview);
app.post('/addreview', postReview);
app.delete('/deletereview/:id', deleteReview);
//upload photo
app.post('/addprojectphoto', addProjectPhoto);
app.get('/projects', getProjectPhoto);
app.delete('/deleteprojectphoto/:id', deleteProjectPhoto);

app.listen(process.env.PORT || 2000);
