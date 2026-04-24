const { ProductImage, Product } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const {
  errorResponse,
  successResponse,
  warningResponse,
} = require("../helpers/response.helper");

exports.UploadImage = async (req, res) => {
  try {
    const { image } = req.files;
    const { id } = req.params;
    const product_id = parseInt(id);

    // validate product id
    const product = await Product.findByPk(product_id);
    if (!product) {
      return warningResponse(res, `Product id=${product_id} not found`, 404);
    }

    const fileName = uuidv4() + path.extname(image.name);

    // upload file to folder uploads/products
    const uploadPath = path.join(
      process.cwd(),
      "src/uploads/products",
      fileName,
    );

    await image.mv(uploadPath);

    // Domain + fileName // domain.com/uploads/products/442899024824.png
    const domain = `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${domain}/uploads/products/${fileName}`;

    const saveImage = await ProductImage.create({
      product_id,
      image_url: imageUrl,
    });

    successResponse(res, "Upload image successfully", saveImage);
  } catch (err) {
    errorResponse(res, "Error upload image", err.message);
  }
};

exports.DownloadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const product_id = parseInt(id);

    const image = await ProductImage.findByPk(product_id);
    if (!image) {
      return warningResponse(res, "Product image not found", 404);
    }

    const fileName = image.image_url.split("/").pop();
    console.log("file name : ", fileName);

    const filePath = path.join(process.cwd(), "src/uploads/products", fileName);

    if (!fs.existsSync(filePath)) {
      return warningResponse(res, "Image don't have in the system", 404);
    }

    res.download(filePath, fileName);
  } catch (err) {
    errorResponse(res, "Error download image", err.message);
  }
};

exports.DeleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image_id = parseInt(id);

    // find image in db
    const image = await ProductImage.findByPk(image_id);
    if (!image) {
      return warningResponse(res, "This image not found", 404);
    }

    const fileName = image.image_url.split("/").pop();
    const filePath = path.join(process.cwd(), "src/uploads/products", fileName);
    await fs.unlinkSync(filePath);
    
    await image.destroy();

    successResponse(res, "Remove image successfully");
  } catch (err) {
    errorResponse(res, "Error delete image", err.message);
  }
};
