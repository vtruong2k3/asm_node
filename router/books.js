const express=require('express')
const multer=require('multer')// app load file
const path = require('path');
const routes=express.Router();
const chekUser=require("../middlewares/index")
const bookControllers=require('../controllers/bookControllers')
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


routes.get('/books',bookControllers.getBooks)
routes.post('/books',chekUser,upload,bookControllers.setBooks)
routes.get('/books/:id',bookControllers.getBookId)
routes.put('/books/:id',chekUser,upload,bookControllers.updateBookId)
routes.delete('/books/:id',chekUser,bookControllers.deleteBookId)
module.exports=routes