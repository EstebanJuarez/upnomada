import express from "express";

import nodemailer from 'nodemailer';
import authMiddleware from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config();

const emailPass = process.env.EMAIL;

const emailRoute = express.Router()



const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'soporte@upnomada.com',
        pass: emailPass
    }
});

emailRoute.post('/', (req, res) => {

    const token = req.header("x-auth-token")
    const decoded = jwt.verify(token, process.env.MI_CLAVE);
    req.user = decoded.user;
    req.user.id = decoded.user.id;
    const user = req.user
    const userId = req.user.id
    const { email, message } = req.body;
    console.log(user);
    console.log(email);
    const mailOptions = {

        from: 'soporte@upnomada.com',
        to: 'esteban.juarez0011@gmail.com',
        subject: 'Upnomada.com Notification',
        text: `Se realizó un pedido\nEl usuario: ${user.nombre} ${user.apellido} con ID: ${userId} realizó una compra`
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