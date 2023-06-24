const express = require("express");
const router = express.Router();
// This is your test secret API key.
const Stripe = require("stripe");
const stripeSecretKey =
  "sk_test_51N7sOgBarsI0ZhAvAS0rOPPDSJEJXNAbcmqsGGhB71IRjscMmNRkKpfBrc3MeJRr4QeBok5J3mmxkNmIn44A9iHz0032OZf60w";

router.post("/payment-sheet", async (req, res) => {
  const { email = `test${Math.floor(Math.random() * 9999) + 1}@domain.com`, price } =
    req.body;

    console.log(req.body)

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2020-08-27",
    typescript: true,
  });

  const customer = await stripe.customers.create({ email });

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price*100,
    currency: "usd",
    payment_method_types: ["card", "link"],
  });
  return res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});
module.exports = router;
