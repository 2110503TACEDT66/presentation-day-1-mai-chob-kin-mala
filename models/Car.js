const mongoose = require("mongoose");
const Booking = require("./Booking");

const CarSchema = mongoose.Schema({
    license: {
        type: String,
        required: [true, "Please add car's license"],
        unique: true,
        maxlength: [10, "License can not be more than 10 characters"],
    },
    type: {
        type: String,
        required: [true, "Please add car's type"],
        maxlength: [30, "Type can not be more than 30 characters"],
    },
    model: {
        type: String,
        required: [true, "Please add car's model"],
        maxlength: [30, "Type can not be more than 30 characters"],
    },
    color: {
        type: [String],
        required: [true, "Please add car's color"],
        maxlength: [20, "Color can not be more than 20 characters"],
    },
    fuel_type: {
        type: String,
        required: [true, "Please add car's fuel type"],
        maxlength: [20, "Fuel type can not be more than 20 characters"],
    },
    year: {
        type: Number,
        required: [true, "Please add car's year"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price (Baht/hour)"]
    },
    mileage: {
        type: Number,
        required: [true, "Please add car's mileage"],
    },
    condition: {
        type: String,
        required: [true, "Please add car's condition"],
        maxlength: [20, "Condition can not be more than 20 characters"],
    },
    image: {
        type: [String],
        required: [true, "Please add car's image"],
    },
    number_of_seats: {
        type: Number,
        required: [true, "Please add car's number_of_seats"],
    },
    status: {
        type: String,
        enum: [
            "available",
            "rented",
            "maintenance",
            "broken"
        ],
        default: "available"
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add a shop Id"],
       
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

CarSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'car',
    justOne: false
});

CarSchema.pre('deleteOne',{document: true, query: false}, async function(next){
    console.log(`Bookings being removed from car ${this._id}`);
    await Booking.deleteMany({car: this._id});
    next();
});

module.exports = mongoose.model("Car", CarSchema);
