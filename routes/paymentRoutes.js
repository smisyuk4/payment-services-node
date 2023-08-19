const express = require('express');
const router = express.Router();
const {
  getPaymentInfo,
  sendHtmlForm,
  sendParams,
  sendReports,
} = require('../services/liqpayServices');

router.post('/getForm', sendHtmlForm);
router.post('/getParams', sendParams);
router.get('/getReports', sendReports);
router.post('/callback', getPaymentInfo);

module.exports = { paymentRoutes: router };
