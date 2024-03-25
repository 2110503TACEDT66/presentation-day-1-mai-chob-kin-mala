const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { getShop, getShops, createShop, updateShop, deleteShop } = require('../controllers/shops');
const carRouter = require('./cars');

router.route('/').get(getShops).post(protect, authorize('admin'), createShop);
router.route('/:id').get(getShop).put(protect, authorize('admin'), updateShop).delete(protect, authorize('admin'), deleteShop);
router.use('/:shopId/cars', carRouter);

module.exports = router;