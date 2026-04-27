require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 3000;
const db = require('./config/db');
const fileUpload = require('express-fileupload');
var path = require('path');

// allowed origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
app.use(cors(corsOptions));
app.use(
    fileUpload({
        limits: {fileSize: 3 * 1024 * 1024},
        createParentPath: true
    }),
);

const authRoutes = require('./src/routes/auth.route');
const customerRoutes = require('./src/routes/customer.route');
const productRoutes = require('./src/routes/product.route');
const categoryRoutes = require('./src/routes/category.route');
const orderRoutes = require('./src/routes/order.route');

// register routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);


// connect to database
db.authenticate()
    .then(() => console.log("Database connected!!"))
    .catch(() => console.error("Connect failed"));

// listen port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});