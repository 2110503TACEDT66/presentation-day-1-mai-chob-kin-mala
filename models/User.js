const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    SSN: {
        type: String,
        unique: [true, "This SSN is already used"],
        required: [true, "Please add your SSN"],
        length: [14,"SSN must contain 14 characters"],

    },
    name: {
        type: String,
        maxlength: [50,"Name can not be more than 50 characters"],
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ],
        unique: [true, "This email is already used"],
        required: [true, "Please add a email"]

    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 8,
        select: false
    },
    telephone_number: {
        type: String,
        required: [true, "Please add a telephone number"],
        length: [10,"Telephone number must contain 10 characters"],
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

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function(enteredPassword) {
    return jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User', UserSchema);