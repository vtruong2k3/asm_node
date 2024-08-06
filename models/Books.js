const mongoose=require("mongoose")

const bookSchema= new mongoose.Schema({
    name:{type:String, require:true},
    price:{type:Number},
    description:{type:String, require:true},
    image:{type:String, require:true},
    author:{type:String, require:true}
},{
    timestamps:true,
    versionKey:false

})


module.exports=mongoose.model('books',bookSchema)