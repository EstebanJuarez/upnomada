import express from 'express'
import mercadopago from "mercadopago";
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js'
import { crearGuestPedido, createPedidoForMP } from '../controllers/pedidoController.js';
import jwt from 'jsonwebtoken'

dotenv.config();

mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY })
const pagoRoute = express.Router()


pagoRoute.post("/", async (req, res) => {
    console.log("ghola");

    const token = req.header("x-auth-token")

    if (token) {
        try {

            const decoded = jwt.verify(token, process.env.MI_CLAVE);
            req.user = decoded.user;
            req.user.id = decoded.user.id;
            const userRole = req.user.role;

            if (userRole === 'proovedor') {
                res.status(401).send('Este metodo de pago no lo pueden usar los proovedores')
            }

            else if (userRole === 'viewer') {
                const prod = req.body;
                const items = prod.carrito.map((producto) => {
                    let unitPrice = parseFloat(producto.talleSeleccionado.detalles_producto.precio);
                    if (producto.descuento) {
                        unitPrice = parseFloat(producto.descuento);
                    }
                    return {
                        id: producto.id,
                        title: producto.descripcion,
                        currency_id: 'ARS',
                        picture_url: producto.imagen,
                        description: producto.descripcion,
                        category_id: 'art',
                        quantity: producto.cantidad,
                        unit_price: unitPrice,
                    };
                });

                console.log(items);

                const pedidoId = await createPedidoForMP(prod, token)



                let preference = {
                    items: items,
                    back_urls: {
                        success: 'http://localhost:3000/realizarcompra?step=1',
                        failure: 'http://localhost:3000/carrito',
                        pending: 'http//localhost:3000/realizarcompra?step=1',
                    },
                    auto_return: 'approved',
                    binary: true,
                    external_reference: pedidoId.toString()
                }
                mercadopago.preferences.create(preference).then((response) => res.status(200).send({ response })).catch((error) => res.status(400).send({ error: error.message }))
            }

            else if (userRole === 'guest') {
                const prod = req.body;

                const items = prod.carrito.map((producto) => {
                    let unitPrice = parseFloat(producto.talleSeleccionado.detalles_producto.precio);
                    if (producto.descuento) {
                        unitPrice = parseFloat(producto.descuento);
                    }
                    return {
                        id: producto.id,
                        title: producto.descripcion,
                        currency_id: 'ARS',
                        picture_url: producto.imagen,
                        description: producto.descripcion,
                        category_id: 'art',
                        quantity: producto.cantidad,
                        unit_price: unitPrice,
                    };
                });

                console.log(items);


                const pedidoId = await crearGuestPedido(prod, token);


                let preference = {
                    items: items,
                    back_urls: {
                        success: 'http://localhost:3000/realizarcompra?step=1',
                        failure: 'http://localhost:3000/carrito',
                        pending: 'http//localhost:3000/pending',
                    },
                    auto_return: 'approved',
                    binary: true,
                    external_reference: pedidoId.toString()
                }
                mercadopago.preferences.create(preference).then((response) => res.status(200).send({ response })).catch((error) => res.status(400).send({ error: error.message }))
            }



        } catch (error) {
            console.log(error);
        }


    }
    else {



        const prod = req.body;
        const items = prod.carrito.map((producto) => {
            let unitPrice = parseFloat(producto.talleSeleccionado.detalles_producto.precio);
            if (producto.descuento) {
                unitPrice = parseFloat(producto.descuento);
            }
            return {
                id: producto.id,
                title: producto.descripcion,
                currency_id: 'ARS',
                picture_url: producto.imagen,
                description: producto.descripcion,
                category_id: 'art',
                quantity: producto.cantidad,
                unit_price: unitPrice,
            };
        });

        console.log(items);


        const pedidoId = await crearGuestPedido(prod, token);


        let preference = {
            items: items,
            back_urls: {
                success: 'http://localhost:3000/realizarcompra?step=1',
                failure: 'http://localhost:3000/carrito',
                pending: 'http//localhost:3000/pending',
            },
            auto_return: 'approved',
            binary: true,
            external_reference: pedidoId.toString()
        }
        mercadopago.preferences.create(preference).then((response) => res.status(200).send({ response })).catch((error) => res.status(400).send({ error: error.message }))
    }
})





export default pagoRoute