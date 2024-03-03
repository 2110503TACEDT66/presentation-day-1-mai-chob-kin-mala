const Car = require("../models/Car");

exports.getCars = async (req, res, next) => {
    let query;

    const reqQuery = {...req.query};

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Car.find(JSON.parse(queryStr)).populate('bookings');

    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else{
        query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page-1) * limit;
    const endIndex = page * limit
    const total = await Car.countDocuments();

    query=query.skip(startIndex).limit(limit);

    try {
        const cars = await query;

        const pagination = {
            current:page,
        };

        if(endIndex<total){
            pagination.next = {
                page:page+1,
                limit
            }
        }

        if(startIndex>0) {
            pagination.prev = {
                page:page-1,
                limit
            }
        }

        res.status(200).json({ success: true, count: cars.length, pagination, data: cars });
    } catch (err) {
        res.status(400).json({ success: false, msg:err.stack });
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({ success: true, data: car });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.getCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id).populate('bookings');;
        if (!car) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: car });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!car) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: car });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(400).json({ success: false });
        }
        await car.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
