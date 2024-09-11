import mongoose from "mongoose";



const userSchema =new mongoose.Schema({


    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, require: true
    },

    token: {
        type: String, require: true
    },


})

export const Users = mongoose.model('User', userSchema)