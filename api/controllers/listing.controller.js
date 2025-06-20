import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  let imgUrls = listing.imageUrls;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  for(let i=0;i<imgUrls.length;i++){
    // const fileName = imgUrls[i];
    const parts = imgUrls[i].split('/uploads/');
    const fileName = parts[1];
    console.log(fileName);
    const filePath = path.join(__dirname, '../../uploads', fileName);
      try {

        if (fs.existsSync(filePath)) {
          // console.log( fileName)
          fs.unlinkSync(filePath);
          // return res.status(200).json({ message: 'File deleted successfully' });
        } else {
          // console.log('file not found at,', filePath)
          return res.status(404).json({ error: 'File not found' });
        }

      } catch (error) {

        return res.status(500).json({ error: 'Internal server error' });
      }
  }
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};




export const uploadImage = async (req, res, next) => {
  // console.log("hii")
  // console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    fileUrl: `http://localhost:3000/uploads/${req.file.filename}`,
  });
};

export const deleteImage = async (req, res) => {
  const fileName = req.params.fileName;
  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '../../uploads', fileName);

  try {
    
    if (fs.existsSync(filePath)) {
      // console.log( fileName)
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'File deleted successfully' });
    } else {
      // console.log('file not found at,', filePath)
      return res.status(404).json({ error: 'File not found' });
    }

  } catch (error) {
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}

