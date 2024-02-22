
const mongoose = require('mongoose');

const connectdb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected To MongoDB");
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = connectdb;