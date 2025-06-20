import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, uploadImage, deleteImage } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import path from 'path';
const router = express.Router();


import  multer from 'multer';
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve('uploads'));
    },
    filename: function (req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
})

function show(req,res,next){
    console.log(path.resolve('../client/public/uploads'));
    next();
}

const upload = multer({storage: storage})

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/upload/Image',upload.single('image'), verifyToken, uploadImage)
router.delete('/delete/image/:fileName', deleteImage);
// router.delete('/delete/:id',verifyToken,(req,res)=>{console.log(req.params.id);})
// router.delete('/delete/:id',(req,res)=>{console.log(req.params.id);})



export default router;

