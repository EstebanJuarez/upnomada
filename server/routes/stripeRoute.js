import Stripe from "stripe";
import express from 'express'
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import dotenv from 'dotenv';
dotenv.config();

const stripeKey = process.env.STRIPE;


const stripe = new Stripe(stripeKey);

const stripeRoute = express.Router()

const localhost = 'http://localhost:3000';


stripeRoute.post('/create-checkout-session', async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        if (token) {

            const decodedToken = jwt.verify(token, process.env.MI_CLAVE);
            const customer_id = decodedToken.user.customer_id;
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // price_1Nda4gAKu1qzzp0FkdFw3hd6
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1NdeVmAKu1qzzp0FhmzTKHAS',
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


    } catch (error) {
        console.error(error);
        res.status(400).send("Error en el servidor");

    }

});



const endpointSecret = "whsec_tzGXnpY60ABCbMKoKyo3robrL0BD6Zrs";

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


stripeRoute.post('/cancel-subscription', async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.MI_CLAVE);
        const customerId = decodedToken.user.customer_id;

        // Obtener las suscripciones del cliente
        const customer = await stripe.customers.retrieve(customerId, {
            expand: ['subscriptions'],
        });

        // Obtener el primer objeto de suscripción (puedes ajustar esto según tu lógica)
        const subscription = customer.subscriptions.data[0];

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        // Cancelar la suscripción en Stripe
        await stripe.subscriptions.update(subscription.id, {
            cancel_at_period_end: true
        });

        // Actualizar el estado del usuario en tu base de datos
        const user = await User.findOne({ where: { customer_id: customerId } });
        if (user) {
            user.status = "canceled";
            await user.save();
        }

        return res.status(200).json({ message: 'Subscription canceled successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

export default stripeRoute