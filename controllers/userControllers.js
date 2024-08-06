const Userr = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { valiRegister, valiLogin } = require("../validateError/authValidate");

exports.register = async (req, res) => {
    try {
        const { error } = valiRegister.validate(req.body, {
            abortEarly: false,
        });


        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                error: errors,
            });
        }
        
        const { name, email, password } = req.body;

        const user = await Userr.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "email da ton tai",
            });
        }

        const hasPassword = await bcrypt.hash(password, 10);

        const setUser = await Userr.create({
            name,
            email,
            password: hasPassword,
        });

        res.status(200).json({
            data: setUser,
        });
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};
exports.login = async (req, res) => {
    try {
        const { error } = valiLogin.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                error: errors,
            });
        }
        const { email, password } = req.body;

        const user = await Userr.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tai khoan mat khau khong ton tai",
            });
        }
        const chekPass = await bcrypt.compare(password, user.password);
        if (!chekPass) {
            return res.status(400).json({
                message: "Tai khoan mat khau khong ton tai",
            });
        }
        const token = jwt.sign({ id: user.id }, "key_token", {
            expiresIn: 60 * 60,
        });
        res
            .status(200)
            .json({ message: "Dang nhap thanh cong", data: user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
