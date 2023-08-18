const express = require('express');
const router = express.Router();
const { getPaymentInfo, sendHtmlForm, sendParams } = require('../services/liqpayCallback');

router.post('/liqpay-payment-info', getPaymentInfo);

router.post('/pay', sendHtmlForm)
router.post('/pay-button', sendParams)

module.exports = { paymentRoutes: router };
