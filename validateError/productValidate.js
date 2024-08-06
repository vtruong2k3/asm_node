const Joi = require("joi");

const valiProduct= Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description:Joi.string().required(),
    image:Joi.string(),
    author:Joi.string().required()
})

module.exports= {valiProduct}