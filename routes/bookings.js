const express = require('express');

const {getBookings,getBooking, updateBooking, addBooking} = require('../controllers/bookings');

const router = express.Router({mergeParams: true});

const {protect} = require('../middleware/auth');

router.route('/').get(protect, getBookings).post(protect, addBooking);
router.route('/:id').get(protect, getBooking).put(protect, updateBooking);


module.exports = router;