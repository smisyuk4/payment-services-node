const express = require('express');
const router = express.Router();
const {
  getPaymentInfo,
  sendReports,
  checkStatus,
  getLink,
  sendRegisterOneDay,
} = require('../services/liqpayServices');

router.post('/callback', getPaymentInfo);
router.get('/getReports', sendReports);
router.post('/getRegister', sendRegisterOneDay);
router.post('/getLink', getLink);
router.post('/checkStatus', checkStatus);

module.exports = { paymentRoutes: router };
