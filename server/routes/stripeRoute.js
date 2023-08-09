import Stripe from "stripe";
import express from 'express'
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const stripe = new Stripe("sk_test_51NaQrxAzaBsx8xim1OGUlxBkATvhc38jcP7pcG0Pi5D7MoBfoVIV42hmvZDbMbvTF2F2tQrvtV9qGflefySq6Lr700uyv3vNUq");

const stripeRoute = express.Router()

const localhost = 'http://localhost:3000';


stripeRoute.post('/create-checkout-session', async (req, res) => {
    const token = req.header("x-auth-token")
    if (token) {

        const decodedToken = jwt.verify(token, process.env.MI_CLAVE);
        const customer_id = decodedToken.user.customer_id;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1NasvmAzaBsx8ximxipRYlYm',
                    quantity: 1,
                },
            ],
            customer: customer_id,
            mode: 'subscription',
            success_url: `${localhost}?success=true`,
            cancel_url: `${localhost}?canceled=true`,
        });

        res.status(201).send(session.url);


    }
    else {
        res.status(400).send("No logeado")
    }


});



const endpointSecret = "whsec_83c892e4d3c10403563a17613ad94e5c59717466438f9d655de2f59bd5b7b103";

// Configura el middleware para obtener el cuerpo sin procesar de la solicitud
stripeRoute.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log(event);
    } catch (err) {
        console.log(err);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const sessionId = event.data.object.id;
            // Consultar información adicional de la sesión de pago si es necesario
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            // Aquí puedes extraer información del cliente y suscripción de la sesión de pago
            const customer_id = session.customer;
            // Actualizar el estado del usuario en tu base de datos
            try {
                const user = await User.findOne({ where: { customer_id } });
                if (user) {
                    user.status = "active";
                    await user.save();
                }
            } catch (error) {
                console.error(`Error al actualizar el estado del usuario: ${error}`);
                return response.sendStatus(500);
            }
            break;

        case 'invoice.payment_failed':
            const invoicePaymentFailed = event.data.object;
            const paymentFailedCustomerId = invoicePaymentFailed.customer;

            // Actualizar el estado del usuario a "canceled" en tu base de datos
            try {
                const user = await User.findOne({ where: { customer_id: paymentFailedCustomerId } });
                if (user) {
                    user.status = "canceled";
                    await user.save();
                }
            } catch (error) {
                console.error(`Error al actualizar el estado del usuario: ${error}`);
                return response.sendStatus(500);
            }
            break;

        case 'customer.subscription.deleted':
            const subscriptionDeleted = event.data.object;
            const subscriptionDeletedCustomerId = subscriptionDeleted.customer;

            // Actualizar el estado del usuario a "canceled" en tu base de datos
            try {
                const user = await User.findOne({ where: { customer_id: subscriptionDeletedCustomerId } });
                if (user) {
                    user.status = "canceled";
                    await user.save();
                }
            } catch (error) {
                console.error(`Error al actualizar el estado del usuario: ${error}`);
                return response.sendStatus(500);
            }
            break;

        case 'charge.refunded':
            const chargeRefunded = event.data.object;
            const refundedCustomerId = chargeRefunded.customer;

            // Actualizar el estado del usuario a "refunded" en tu base de datos
            try {
                const user = await User.findOne({ where: { customer_id: refundedCustomerId } });
                if (user) {
                    user.status = "refunded";
                    await user.save();
                }
            } catch (error) {
                console.error(`Error al actualizar el estado del usuario: ${error}`);
                return response.sendStatus(500);
            }
            break;


        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Devuelve una respuesta 200 para confirmar la recepción del evento
    response.send();
});






export default stripeRoute