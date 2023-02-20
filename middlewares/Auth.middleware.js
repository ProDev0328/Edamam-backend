// const jwt = require("jsonwebtoken")
// const User = require("../models/User.model")
// const Role = require("../models/Role.model")

exports.isValidToken = async (req, res, next) => {
    try {
        // const token = req.header("Authorization")
        // if (!token)
        //     return res.status(401).json({
        //         success: false,
        //         result: null,
        //         message: "No authentication token, authorization denied.",
        //         jwtExpired: true,
        //     })
    
        // const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
        // if (!verified)
        //     return res.status(401).json({
        //         success: false,
        //         result: null,
        //         message: "Token verification failed, authorization denied.",
        //         jwtExpired: true,
        //     })
    
        // const user = await User.findOne({ _id: verified.id })
        // if (!user)
        //     return res.status(401).json({
        //         success: false,
        //         result: null,
        //         message: "Admin doens't Exist, authorization denied.",
        //         jwtExpired: true,
        //     })
    
        // req.userModel = user

        // let roles = await Role.find({ user_id: user._id })
        // req.userModel.roles = roles

        next()
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
