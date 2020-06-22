const mongoose = require('mongoose');
const config = require('config');
const router = require('../routes/api/auth');
const Profile = require('../models/Profile');

const db = config.get('mongoURI');

const connectDB = async ()=>{
try{
    await mongoose.connect(db,
        { useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true ,
    useFindAndModify: false}
      
    );

    console.log('Mongodb Connected'); 

}catch(err){
    console.error(err.message);
    process.exit(1);
};
};






module.exports =connectDB;