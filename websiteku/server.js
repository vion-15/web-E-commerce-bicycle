import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('halamanchekout.php', {root: 'public'});
});

app.get('/success', (req, res) => {
    res.sendFile('success.html', {root: 'public'});
});

app.get('/gagal', (req, res) => {
    res.sendFile('gagal.html', {root: 'public'});
});

//stripe
let stripeGateway = stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;

app.post('/stripe-checkout', async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
        console.log('item-price:', item.price);
        console.log('unitAmount:', unitAmount);
        return {
            price_data: {
                currency: 'idr',
                product_data: {
                    name: item.title,
                    images: [item.productImg]
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        };
    });
    console.log('lineItems:', lineItems)

const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/gagal`,
    line_items: lineItems,

    billing_address_collection: 'required',
    });
    res.json(session.url);
});

app.listen(3000, () => {
    console.log("listening on port 3000;");
});