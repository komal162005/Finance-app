const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserS = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    ConfirmPassword:{
        type:String,
        required:true
    }
})
UserS.pre('save', async function (next) {
    const user = this;
    console.log("Just before saving before hashing  ", user.password);
    if (!user.isModified('password')) {
        return next();
    }
    user.password = await bcrypt.hash(user.password, 8);
    console.log("Just before saving & after hashing", user.password);
    next();
})


const collection = mongoose.model("User",UserS);
module.exports = collection;