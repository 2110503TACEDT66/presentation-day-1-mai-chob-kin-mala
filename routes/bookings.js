const express = require('express');

const {getBookings,getBooking} = require('../controllers/bookings');

const router = express.Router({mergeParams: true});

const {protect} = require('../middleware/auth');

router.route('/').get(protect, getBookings);
router.route('/:id').get(protect, getBooking);


module.exports = router;