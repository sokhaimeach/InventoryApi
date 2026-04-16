const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controller');
const { getAllProducts, createNewProduct } = require('../controllers/product.controller');

// products
router.get("/", getAllProducts);
router.post("/", createNewProduct);

// upload image
router.post('/:id/upload', ImageController.UploadImage);

router.get("/:id/download", ImageController.DownloadImage);

module.exports = router;