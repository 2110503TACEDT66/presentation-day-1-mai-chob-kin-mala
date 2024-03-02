const User = require('../models/User');

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
        sendTokenResponse(user, 200, res);
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

    const isMatch = await user.matchPassword(password)
    if(!isMatch){
        res.status(401).json({success: false, msg: 'Invalid credentials'});
    }
    
    sendTokenResponse(user, 200, res);
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

const sendTokenResponse = (user, statusCode, res)=>{

    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now + process.env.JWT_COOKIE_EXPIRE *60*60*24*1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV==='production'){
        options.secure = true;
    }

    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        token
    })

}