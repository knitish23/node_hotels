const mongoose = require('mongoose');
//Define the MongoDB connection URL
const mongourl = 'mongodb://127.0.0.1:27017/hotels';

//Set up MongoDB Connection
mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

//Get the default connection
//Message maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define the event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB server')
});

db.on('error',(err)=>{
    console.log('MongoDB connection error',err)
});

db.on('disconnected',(err)=>{
    console.log('MongoDB disconnected',err)
});

//Export the database connection
module.exports=db;