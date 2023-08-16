const express = require('express');
const router = express.Router();
const { getPaymentInfo } = require('../services/liqpayCallback');

router.post('/liqpay-payment-info', getPaymentInfo);

module.exports = { paymentRoutes: router };
