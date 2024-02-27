const User = require('../models/user');

exports.register = async(req, res, next)=> {
    try{
        const {SSN, name, email, password,telephone_number, role, address} = req.body;
        const user = await User.create({
            SSN,
            name,
            email,
            password,
            telephone_number,
            role,
            address
        })
        res.status(200).json({success: true});
    }
    catch(err){
        res.status(400).json({success:false});
        console.log(err.stack);
    }
}

exports.login = (req, res, next)=> {
    res.status(200).json({success: true});
}

exports.getMe = (req, res, next)=> {
    res.status(200).json({success: true});
}