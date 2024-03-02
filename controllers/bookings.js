const Booking = require('../models/Booking');

exports.getBookings = async (req, res, next) => {
    let query;
    if (req.user.role !== 'admin') {
        query = Booking.find({ user: req.user.id }).populate({
            path: 'car',
            select: 'license type model color fuel_type year status'
        }).populate({
            path: 'user',
            select: 'SSN name email telephone_number role'
        });
    }
    else {
        if (req.params.hospitalId) {
            console.log(req.params.hospitalId);
            query = Booking.find({ hospital: req.params.hospitalId }).populate({
                path: 'car',
                select: 'license type model color fuel_type year status'
            }).populate({
                path: 'user',
                select: 'SSN name email telephone_number role'
            });
        } else {
            query = Booking.find().populate({
                path: 'car',
                select: 'license type model color fuel_type year status'
            }).populate({
                path: 'user',
                select: 'SSN name email telephone_number role'
            });
        }
    }
    try {
        const bookings = await query;
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot find Appointment" });
    }
};