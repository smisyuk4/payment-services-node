const LiqPay = require('../providers/liqpay');
require('dotenv').config();
const { v4: uuidV4 } = require('uuid');
const private_key = process.env.LIQPAY_PRIVATE_KEY;
const public_key = process.env.LIQPAY_PUBLIC_KEY;

const liqpay = new LiqPay(public_key, private_key);

const getPaymentInfo = async (req, res, next) => {
  const { data, signature } = req.body;
  console.log('=========> message from bank', `${data}, ===>>>> ${signature}`);
  //   try {
  //     res.send({
  //       status: 'Upload was successful',
  //       result: req.body,
  //       ressulTwo: {
  //         data,
  //         signature,
  //       },
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  // async ({ data, signature }) => {
  const compSignature = liqpay.str_to_sign(private_key + data + private_key);
  console.log('compSignature ', compSignature);

  if (signature === compSignature) {
    const buff = Buffer.from(data, 'base64');
    let text = buff.toString('utf-8');
    text = JSON.parse(text);
    console.log('text ', text);

    const { status, amount, order_id, payment_id } = text;

    return res.send({
      status: 'Payment check',
      resultFrom: {
        data,
        signature,
      },
      text: { status, amount, order_id, payment_id },
    });
  }

  res.send({
    status: 'signature !== compSignature',
    result: req.body,
  });
};

const sendHtmlForm = async (req, res, next) => {
  const { amount, description } = req.body;
  console.log(amount, description);

  var html = liqpay.cnb_form({
    action: 'pay',
    amount,
    currency: 'USD',
    description,
    order_id: uuidV4(),
    version: '3',
    language: 'uk',
    server_url: 'https://payment-server-node.onrender.com/liqpay-payment-info',
  });

  res.send(html);
};

// router.post('/', async (req, res, next) => {
//   return await service.makePayment(req.body).then(paymentResult => {
//     res.status(200).json(paymentResult);
//   });
// });

module.exports = {
  getPaymentInfo,
  sendHtmlForm,
};
