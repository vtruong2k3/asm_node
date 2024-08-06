const express=require('express')
const routes=express.Router();
const userControllers=require('../controllers/userControllers')

routes.post('/auth/register',userControllers.register)
routes.post('/auth/login',userControllers.login)

module.exports=routes