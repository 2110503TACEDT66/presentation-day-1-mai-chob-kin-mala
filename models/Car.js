const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    license:{
        type: String,
        required : [true, "Please enter car's license"],
        unique: true,
        maxLength: [6,"License can not be more than 6 characters"]
    },
    type:{
        type: String,
        required: [true, "Please enter car's type"],
        maxLength: [20,"Type can not be more than 20 characters"]
    },
    model:{
        type: String,
        required: [true, "Please enter car's model"],
        maxlength: [20,"Type can not be more than 20 characters"]
    },
    color:{
        type: [String],
        required: [true, "Please enter car's color"],
        maxlength: [10,"Color can not be more than 10 characters"]
    },
    fuel_type:{
        type: String,
        required: [true, "Please enter car's fuel type"],
        maxlength: [10,"Fuel type can not be more than 10 characters"]
    },
    year:{
        type: Number,
        required: [true, "Please enter car's year"],
    },
    mileage:{
        type: Number,
        required: [true, "Please enter car's mileage"],
    },
    condition:{
        type: String,
        required: [true, "Please enter car's condition"],
        maxlength: [10,"Condition can not be more than 10 characters"]
        
    },
    image:{
        type: [String],
        required: [true, "Please enter car's image"],
    },
    number_of_seats:{
        type: Number,
        required: [true, "Please enter car's number_of_seats"],
    }
});

module.exports = mongoose.model('Car',CarSchema);