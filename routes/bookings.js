const express = require('express');

const {getBookings,getBooking, updateBooking, addBooking, deleteBooking} = require('../controllers/bookings');

const router = express.Router({mergeParams: true});

const {protect} = require('../middleware/auth');

router.route('/').get(protect, getBookings).post(protect, addBooking);
router.route('/:id').get(protect, getBooking).put(protect, updateBooking).delete(protect, deleteBooking);


module.exports = router;