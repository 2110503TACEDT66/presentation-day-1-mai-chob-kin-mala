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

exports.updateAppointment = async (req, res, next) => {
    try{
        let booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({success:false, message:`No appointment with the id of ${req.params.id}`});
        }

        booking = Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    }
    catch (err){
        console.log(err);
        return res.status(500).json({success: false, message:"Cannot update Booking"});
    }
}