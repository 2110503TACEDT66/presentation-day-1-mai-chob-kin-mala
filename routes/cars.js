const express = require("express");
const router = express.Router();

const {
    getCars,
    createCar,
    getCar,
    updateCar,
    deleteCar,
} = require("../controllers/cars");
const { protect } = require("../middleware/auth");

router.route("/").get(getCars).post(protect, createCar);
router
    .route("/:id")
    .get(getCar)
    .put(protect, updateCar)
    .delete(protect, deleteCar);

module.exports = router;
