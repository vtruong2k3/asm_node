const User = require('../models/User');
const jwt = require('jsonwebtoken');

const chekUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            });
        }

        const data = jwt.verify(token, 'key_token');
        const user = await User.findById(data.id);

        if (!user) {
            return res.status(401).json({
                message: "User không hợp lệ"
            });
        }
        
        
        if(user.isadmin !== "admin"){
            return res.status(401).json({
                message: "Bạn không phải admin",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

module.exports = chekUser;
