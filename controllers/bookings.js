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

exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path: 'car',
            select: 'license type model color fuel_type year status'
        }).populate({
            path: 'user',
            select: 'SSN name email telephone_number role'
        });
        if (!booking) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: `No booking with the id of ${req.params.id}`,
                });
        }

        res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot find Booking" });
    }
};

exports.addBooking = async (req, res, next) => {
    try {
      req.body.hospital = req.params.hospitalId;
  
      const hospital = await Hospital.findById(req.params.hospitalId);
  
      if (!hospital) {
        return res
          .status(404)
          .json({
            success: false,
            message: `No hospital with the id of ${req.params.hospitalId}`,
          });
      }
  
      const appointment = await Appointment.create(req.body);
      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot create Appointment" });
    }
  };

exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: `No appointment with the id of ${req.params.id}` });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot update Booking" });
    }
}