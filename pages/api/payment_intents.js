import Stripe from 'stripe'

const stripe = new Stripe ('sk_test_51J4pECI6Kpzdhe1Hkk4CPokZ4ISCbuxO4LYNjAmQRgxM5zQ5FJJZgqXBTAxwIlgYQbeq13QLdLFc2VX07k817jos00Tuiy2LO1', {
  apiVersion: '2020-08-27'
})

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      console.log(req.body)





      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
      });

     /* const paymentIntent1 = await stripe.paymentIntents.confirm(
          paymentIntent.id,
      );

      console.log('teeyeyeyey', paymentIntent)
      console.log('confirm', paymentIntent1)

      */
      console.log(paymentIntent)

      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      console.log('errrurur', err)
      res.status(500).json({statusCode: 500, message: err.message})
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end('Method not allowed')
  }
}
