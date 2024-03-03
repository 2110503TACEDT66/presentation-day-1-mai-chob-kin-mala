const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    car: {
        type:mongoose.Schema.Types.ObjectId,
        require: [true, "Please add Cars ID"],
        ref: 'Car'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "Please add User ID"],
        ref: 'User'
    },
    startDate: {
        type: Date,
        require: [true, "Please add a start date"],
        default: Date.now
    },
    endDate: {
        type:Date,
        default: function() {
            return new Date(this.startDate.getTime() + this.duration * 60 * 60 * 1000);
        }
    },
    duration:{
        type: Number,
        require: [true, "Please add a duration(hours)"]
    },
    totalPrice: {
        type: Number,
        require: [true, "Please add a total price"],
    },
    status: {
        type: String,
        enum: [
            "used",
            "canceled",
            "rented",
            "waiting"
        ],
        default: "waiting"
    },
    deposit: {
        type: Number,
        default: 0
    },
    after: {
        conditions:{
            type: String,
        },
        delMileage:{
            type: Number,
        },
        fuel:{
            type: Number,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", BookingSchema);