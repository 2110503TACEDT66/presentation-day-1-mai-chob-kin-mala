const express = require('express');

const {getBookings,getBooking, updateBooking, addBooking, deleteBooking} = require('../controllers/bookings');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getBookings).post(protect, authorize('admin'), addBooking);
router.route('/:id').get(protect, getBooking).put(protect, authorize('admin'), updateBooking).delete(protect, authorize('admin'), deleteBooking);


module.exports = router;