const express = require('express');
const router = express.Router();
const { getPaymentInfo, sendHtmlForm } = require('../services/liqpayCallback');

router.post('/liqpay-payment-info', getPaymentInfo);
router.post('/pay', sendHtmlForm)

module.exports = { paymentRoutes: router };
