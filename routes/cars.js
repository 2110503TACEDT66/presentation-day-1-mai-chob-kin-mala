const express = require("express");
const router = express.Router();

const {
    getCars,
    createCar,
    getCar,
    updateCar,
    deleteCar,
} = require("../controllers/cars");
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getCars).post(protect, authorize('admin'), createCar);
router
    .route("/:id")
    .get(getCar)
    .put(protect, authorize('admin'), updateCar)
    .delete(protect, authorize('admin'), deleteCar);

module.exports = router;
