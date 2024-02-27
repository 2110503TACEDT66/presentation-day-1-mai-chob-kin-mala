const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({
    SSN: {
        type: String,
        unique: [true, "This SSN is already used"],
        required: [true, "Please enter your SSN"],
        length: [14,"SSN must contain 14 characters"],

    },
    name: {
        type: String,
        maxlength: [50,"Name can not be more than 50 characters"],
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ],
        unique: [true, "This email is already used"],
        required: [true, "Please enter your email"]

    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false
    },
    telephone_number: {
        type: String,
        required: [true, "Please enter your telephone number"],
        length: [10,"Telephone number must contain 14 characters"],
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    address: {
        type: String
    }

});

UserSchema.pre('save', async (next)=>{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);