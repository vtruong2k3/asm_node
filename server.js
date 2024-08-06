const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const path=require('path')
const multer=require('multer')
const bookRoter=require('./router/books')
const userRoter=require('./router/user');
const { error, log } = require('console');
const app=express()
const port=3000
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});
// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Init upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // 1MB limit
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     }
// }).single('image');

// // Check file type
// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost:27017/asm_node')
.then(()=>{
    app.use(bookRoter);
    app.use(userRoter)
    app.listen(port,()=>{
        console.log("server run port",port);
        
    })
})
.catch(error=>console.log(error.message));

