const Books=require('../models/Books');
const { valiProduct } = require('../validateError/productValidate');
exports.getBooks = async (req, res) => {
    try {
        const data = await Books.find();
        
        if (res.headersSent) {
            return;
        }
        
        res.render('index', { data });
    } catch (error) {
        console.log(error.message);
        
        if (res.headersSent) {
            return;
        }
        
        res.status(500).json({
            error: error.message,
        });
    }
};



exports.setBooks = async (req, res) => {
    try {
        const{error}=valiProduct.validate(req.body,{
            abortEarly:false
        })
        if(error){
            const errors=error.details.map(err=>err.message)
           return res.status(400).json({
                error: errors
            });
        }
        const { name, price, description, author } = req.body;
        const image = req.file ? req.file.filename : null;
        const setBook = await Books.create({
            name, price, description, image, author
        });
        
        if (res.headersSent) {
            return;
        }

        res.status(200).json({
            message: "thêm thành công",
            data: setBook,
        });
    } catch (error) {
        console.log(error.message);

        if (res.headersSent) {
            return;
        }

        res.status(500).json({
            error: error.message,
        });
    }
};

exports.getBookId = async (req, res) => {
    try {
        const proId = req.params.id;
        const setBook = await Books.findById(proId);
        
        if (res.headersSent) {
            return;
        }

        res.status(200).json(setBook);
    } catch (error) {
        console.log(error.message);

        if (res.headersSent) {
            return;
        }

        res.status(500).json({
            error: error.message,
        });
    }
};

exports.updateBookId = async (req, res) => {
    try {
        const proId = req.params.id;

        const{error}=valiProduct.validate(req.body,{
            abortEarly:false
        })
        if(error){
            const errors=error.details.map(err=>err.message)
           return res.status(400).json({
                error: errors
            });
        }
        const updatedData = { ...req.body };

        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const setBook = await Books.findByIdAndUpdate(proId, updatedData, { new: true });

        if (res.headersSent) {
            return;
        }

        res.status(200).json({
            message: "Sửa thành công",
            data: setBook,
        });
    } catch (error) {
        console.log(error.message);
        
        if (res.headersSent) {
            return;
        }

        res.status(500).json({
            error: error.message,
        });
    }
};

exports.deleteBookId = async (req, res) => {
    try {
        const proId = req.params.id;

        await Books.findByIdAndDelete(proId);

        if (res.headersSent) {
            return;
        }

        res.status(200).json({
            message: "XOÁ THÀNH CÔNG",
        });
    } catch (error) {
        console.log(error.message);
        
        if (res.headersSent) {
            return;
        }

        res.status(500).json({
            error: error.message,
        });
    }
};
