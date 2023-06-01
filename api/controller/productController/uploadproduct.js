/*
 * This file defines the controller for updating a product
 * Check the routes folder for the endpoint
 */

const Product = require('../../models/product');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: 'products/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPG, JPEG, and PNG files are allowed.',
      ),
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: fileFilter,
});

const createProductValidator = [
  //body('userId').notEmpty().isInt().withMessage('Invalid user ID'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').notEmpty().isFloat().withMessage('Invalid price'),
  body('campus').notEmpty().withMessage('Campus is required'),
  body('quantity').notEmpty().isInt().withMessage('Invalid quantity'),
  body('category').notEmpty().withMessage('Category is required'),
  // Add more validation rules for other fields if needed
];

const createProduct = async (req, res) => {
  try {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, campus, quantity, category } = req.body;

    const { userId } = req.params;
    // Get the uploaded image file path

    if (!req.file) {
      return res.status(400).json({ error: `Image file is required` });
    }
	if (req.file === undefined) {
	  return res.status(400).json({error: 'Image file is required'});
	}
    const imagePath = req.file.path;

    // Create a new product using the Product model
    const newProduct = await Product.create({
      userId,
      title,
      description,
      price,
      campus,
      quantity,
      category,
      imageUrl: imagePath, // Store the image file path in the imageUrl field
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    // Handle specific errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds the limit' });
      }
      if (error.code === 'BAD_REQUEST') {
        return res.status(400).json({ error: 'Invalid request' });
      }
    }
    console.error('Error creating product:', error);
    return res.status(500).json({ error: 'Failed to create product' });
  }
};

module.exports = {
  createProductValidator,
  createProduct,
  upload, // Export the multer upload object for route configuration
};
