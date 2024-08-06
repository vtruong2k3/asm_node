const Joi = require("joi");

const valiRegister = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required(),
    isadmin:Joi.string()
})

const valiLogin = Joi.object({
   
    email:Joi.string().required().email(),
    password:Joi.string().required(),
})

module.exports= {valiLogin,valiRegister}