const express = require('express');
const router = express.Router();
const { getPaymentInfo, sendHtmlForm, sendParams } = require('../services/liqpayCallback');

router.post('/getForm', sendHtmlForm)
router.post('/getParams', sendParams)
router.post('/callback', getPaymentInfo);

module.exports = { paymentRoutes: router };
