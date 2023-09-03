const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    token:{
        type:String,
    },
    userimg: {
        type: String,
    },
    password: {
        type : String
    }
});

//Export the model
const Userschema = mongoose.model('User', userSchema);
module.exports = Userschema