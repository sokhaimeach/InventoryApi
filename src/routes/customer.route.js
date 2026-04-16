const express = require('express');
const { getAllCustomers } = require('../controllers/customer.controller');
const protect = require('../middlewares/auth.middleware');
const router = express.Router();

router.route('/')
    .get(protect, getAllCustomers);

module.exports = router;