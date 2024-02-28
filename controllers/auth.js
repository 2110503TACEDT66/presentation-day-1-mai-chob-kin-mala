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
        const token = user.getSignedJwtToken();
        res.status(200).json({success: true, token });
    }
    catch(err){
        res.status(400).json({success:false});
        console.log(err.stack);
    }
}

exports.login = async (req, res, next)=> {
    const {email, password} = req.body;

    if(!email || !password){
        return  res.status(400).json({success: false, msg: 'Please provide an email and password'});
    }
    
    const user = await User.findOne({email}).select('+password');

    if(!user){
        res.status(400).json({success: false, msg: 'Invalid credentials'});
    }

    const matchPassword = await user.matchPassword(req.body.password)
    if(!matchPassword){
        res.status(400).json({success: false, msg: 'Invalid credentials'});
    }
    
    const token = user.getSignedJwtToken();
    res.status(200).json({success: true, token});
}

exports.getMe = async (req, res, next)=> {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({success: true, data:user});
    }
    catch(err){
        
    }
    res.status(200).json({success: true});
}