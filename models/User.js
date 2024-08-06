
const mongoose=require('mongoose')


const userShema=mongoose.Schema({

    name:{type:String,require:true},
    email:{type:String,require:true , unique:true},
    password:{type:String, require:true},
    isadmin:{type: String},
},{
    timestamps:true,
    versionKey:false
})
module.exports=mongoose.model('users',userShema)