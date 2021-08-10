import Stripe from 'stripe'

const stripe = new Stripe (`${process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY}`, {
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
