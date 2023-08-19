const LiqPay = require('../providers/liqpay');
require('dotenv').config();
const { v4: uuidV4 } = require('uuid');
const private_key = process.env.LIQPAY_PRIVATE_KEY;
const public_key = process.env.LIQPAY_PUBLIC_KEY;

const liqpay = new LiqPay(public_key, private_key);

const getPaymentInfo = async (req, res, next) => {
  const { data, signature } = req.body;
  console.log('=========> message from bank', `${data}, ===>>>> ${signature}`);

  const compSignature = liqpay.strToSign(private_key + data + private_key);
  console.log('compSignature ', compSignature);

  if (signature === compSignature) {
    const buff = Buffer.from(data, 'base64');
    let text = buff.toString('utf-8');
    text = JSON.parse(text);
    console.log('text ', text);

    const { status, amount, order_id, payment_id } = text;

    return;
  }
};

const sendReports = async (req, res, next) => {
  const date_to = Date.now();
  const date_from = date_to - 604800; // minus one week
  console.log(`date_from: ${date_from}_____date_to: ${date_to}`);

  const reports = await liqpay.api('request', {
    action: 'reports',
    version: '3',
    date_from,
    date_to,
  });

  console.log('reports', reports);
  res.send({
    reports,
  });
};

const sendRegisterOneDay = async (req, res, next) => {
  const { date } = req.body;

  const reports = await liqpay.api('request', {
    action: 'register',
    version: '3',
    format: 'json',
    date,
  });

  console.log('reports', reports);
  res.send({
    reports,
  });
};

const checkStatus = async (req, res, next) => {
  const { orderId } = req.body;
  console.log('checkStatus - orderId =>>> ', orderId);

  const reports = await liqpay.api('request', {
    action: 'status',
    version: '3',
    order_id: orderId,
  });

  console.log('reports', reports);
  res.send({
    reports,
  });
};

const getLink = async (req, res, next) => {
  console.log('getLink =>>> ', req.body);

  const link = await liqpay.formatingLink(req.body);

  console.log('link', link);
  res.send({
    link,
  });
};

module.exports = {
  getPaymentInfo,
  sendReports,
  checkStatus,
  getLink,
  sendRegisterOneDay,
};
