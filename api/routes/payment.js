const paypal = require("paypal-rest-sdk");
const DigitalWallet = require("../models/DigitalWallet");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Service = require("../models/Service");
const router = require("express").Router();
const verify = require("../verify");
const PaymentCtrl = require("../controllers/PaymentCtrl");
// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
// });
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AcRmsTw4UJXHWlHqqJHR1qbD6i32741mcZN8wdiNchysbMn3QyoC39PXI9qQhqO0xgagii5jinsPd95J",
  client_secret:
    "EGFQxwVVcVSV6Oha_cBI_OiLr3zhBQe0KZI8uNzDDV3OjNCOkRHtIEjY7sl6ovresBfB5ScEC3n1N_Cg",
});

router.post("/", verify, async (req, res) => {
  const service = req.body;

  const payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success?serviceId=" + service._id,
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: service.name,
              description: service.desc,
              quantity: 1,
              price: (
                service.price -
                service.price * service.discount
              ).toString(),
              currency: "USD",
              sku: service._id,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: (service.price - service.price * service.discount).toString(),
        },
        description: "This is the payment description.",
        payment_options: {
          allowed_payment_method: "IMMEDIATE_PAY",
        },
      },
    ],
  };

  paypal.payment.create(payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.status(201).json({
            status: "success",
            link: payment.links[i].href,
          });
        }
      }
    }
  });
});

router.get("/success", verify, (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };
  const serviceId = req.query.serviceId;
  paypal.payment.execute(paymentId, payerId, async function (error, payment) {
    if (error) {
      console.error(JSON.stringify(error));
      res.status(400).json(error);
    } else {
      if (payment.state == "approved") {
        try {
          const p = await Payment.findById(paymentId);
          if (!p) {
            const d = new Date();
            const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const end = new Date(
              d.getFullYear(),
              d.getMonth(),
              d.getDate() + 30
            );
            const service = await Service.findById(serviceId);

            const newOrder = new Order({
              user: req.user.id,
              service: service._id,
              startAt: start,
              endAt: end,
            });
            const order = await newOrder.save();
            const newPayment = new Payment({
              _id: paymentId,
              order: order._id,
              total: service.price - service.price * service.discount,
            });
            const savedPayment = await newPayment.save();
            const newDigitalWallet = new DigitalWallet({
              // payment: savedPayment._id,
              _id: paymentId,
              email: payment.payer.payer_info.email,
            });
            await newDigitalWallet.save();
          }
          res.status(201).json({
            status: "success",
            payment: payment,
          });
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(400).json({
          status: "payment not successful",
          payment: {},
        });
      }
    }
  });
});

router.get("/cancel", verify, (req, res) => {
  res.status(201).json({
    status: "fail",
    msg: "payment cancel",
  });
});

router.get("/bymonth", verify, PaymentCtrl.getPaymentByMonth);

router.get("/recently", verify, PaymentCtrl.getPaymentsRecently);

router.get("/stats", verify, PaymentCtrl.stats);

module.exports = router;
