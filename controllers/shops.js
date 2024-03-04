const Shop = require("../models/Shop")

exports.getShops = async (req, res, next)=>{
    let query;

    const reqQuery = {...req.query};

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Shop.find(JSON.parse(queryStr)).populate('cars');

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
    const total = await Shop.countDocuments();

    query=query.skip(startIndex).limit(limit);

    try {
        const shops = await query;

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

        res.status(200).json({ success: true, count: shops.length, pagination, data: shops });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.stack });
    }
}

exports.getShop = async (req, res, next)=>{
    try {
        const shop = await Shop.findById(req.params.id).populate('cars');;
        if (!shop) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: shop });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

exports.createShop = async (req, res, next)=>{
    try {
        const shop = await Shop.create(req.body);
        res.status(201).json({ success: true, data: shop });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

exports.updateShop = async (req, res, next)=>{
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!shop) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: shop });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

exports.deleteShop = async (req, res, next)=>{
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(400).json({ success: false });
        }
        await shop.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}