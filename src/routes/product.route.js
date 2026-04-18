const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controller');
const { getAllProducts, createNewProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const protect = require('../middlewares/auth.middleware');

router.use(protect);

// products
router.get("/", getAllProducts);
router.post("/", createNewProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// upload image
router.post('/:id/upload', ImageController.UploadImage);

router.get("/:id/download", ImageController.DownloadImage);

module.exports = router;