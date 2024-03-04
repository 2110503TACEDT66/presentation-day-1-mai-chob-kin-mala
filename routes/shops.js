const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { getShop, getShops, createShop, updateShop, deleteShop } = require('../controllers/shops');

router.route('/').get(protect, authorize('admin'), getShops).post(protect, authorize('admin'), createShop);
router.route('/:id').get(protect, authorize('admin'), getShop).put(protect, authorize('admin'), updateShop).delete(protect, authorize('admin'), deleteShop);


module.exports = router;