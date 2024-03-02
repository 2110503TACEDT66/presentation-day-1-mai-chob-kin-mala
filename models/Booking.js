const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        require: [true, "Please add a start date"]
    },
    endDate: {
        type:Date,
    },
    duration:{
        type: Number,
        require: [true, "Please add a duration"]
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
            "activating",
            "waiting"
        ],
        default: "waiting"
    },
    deposit: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", BookingSchema);