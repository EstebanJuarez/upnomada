import express from "express";

import nodemailer from 'nodemailer';
import authMiddleware from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken'


const emailRoute = express.Router()



const transporter = nodemailer.createTransport({
    host: 'c2190654.ferozo.com',
    port: 465,
    secure: true,
    auth: {
        user: 'notification@grupobitech.com',
        pass: 'Droid289@'
    }
});

emailRoute.post('/', (req, res) => {

    const token = req.header("x-auth-token")
    const decoded = jwt.verify(token, process.env.MI_CLAVE);
    req.user = decoded.user;
    req.user.id = decoded.user.id;
    const user= req.user
    const userId = req.user.id
    const { email, message, formValues } = req.body;
    console.log(user);
    console.log(email);

    console.log(formValues);
    const mailOptions = {

        from: 'notification@grupobitech.com',
        to: email,
        subject: 'bitechgroup.store Notification',
        text: `Se realizó un pedido\nEl usuario: ${user.nombre} ${user.apellido} con ID: ${userId} realizó un pedido\nPedido: \n
        Detalles de pago: ${message.detalles_pago}\n
        Dirección: ${formValues.direccion}\n
        Total: $${message.total}\n  `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            console.log(info);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});


export default emailRoute