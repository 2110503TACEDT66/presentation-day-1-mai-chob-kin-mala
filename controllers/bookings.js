const Booking = require('../models/Booking');
const Car = require('../models/Car');

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
        if (req.params.carId) {
            console.log(req.params.carId);
            query = Booking.find({ car: req.params.carId }).populate({
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
        return res.status(500).json({ success: false, message: "Cannot find Booking" });
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
      req.body.car = req.params.carId;
  
      const car = await Car.findById(req.params.carId);
  
      if (!car) {
        return res
          .status(404)
          .json({
            success: false,
            message: `No car with the id of ${req.params.carId}`,
          });
      }
  
      const booking = await Booking.create(req.body);
      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot create Booking" });
    }
  };

exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: `No booking with the id of ${req.params.id}` });
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

exports.deleteBooking = async (req, res, nex) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res
          .status(404)
          .json({
            success: false,
            message: `No booking with the id of ${req.params.id}`,
          });
      }
  
      await booking.deleteOne();
  
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot delete Booking" });
    }
};
  