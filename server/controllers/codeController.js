import axios from "axios"
import User from "../models/userModel.js";
import RecoveryCode from "../models/codeModel.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import moment from 'moment';
import bcrypt from 'bcrypt'

dotenv.config();
const emailPass = process.env.EMAIL;

const generateRecoveryCode = () => {
    const code = crypto.randomInt(100000, 1000000).toString(); // Genera un número aleatorio de 6 dígitos
    return code;
}

export const generateCode = async (req, res) => {
    try {
        const { email } = req.body;
        // Busca al usuario por su dirección de correo electrónico
        const user = await User.findOne({ where: { email_user: email } });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        await RecoveryCode.destroy({ where: { id_user: user.id_user } });
        // Genera y guarda el código de recuperación en la base de datos
        const recoveryCode = generateRecoveryCode();
        const expirationDate = moment().add(5, 'minutes');
        const newRecoveryCode = await RecoveryCode.create({
            code: recoveryCode,
            expiration: expirationDate,
            id_user: user.id_user // Asigna el ID del usuario
        });
        // Envía el código de recuperación por correo electrónico al usuario
        sendMail(email, recoveryCode)
        res.status(200).json({ message: "Se ha enviado un código de recuperación a su correo electrónico." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor." });
    }
}


const sendMail = async (email, recoveryCode) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'soporte@upnomada.com',
            pass: emailPass
        }
    });

    const mailOptions = {
        from: 'soporte@upnomada.com',
        to: email,
        subject: 'Código de verificación',
        text: `Introduce el siguiente código para continuar con la recuperación de tu cuenta: ${recoveryCode}` // Asegúrate de incluir el código aquí
    };

    try {
        //FIXME: descomentar el info, para que se envie el correo con el codigo
        
        //  const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error sending email' };
    }
};



export const updatePassword = async (req, res) => {
    try {
        const { email, newPassword, recoveryCode } = req.body;

        await verifyRecoveryCode(email, recoveryCode);
        // Buscar al usuario por su dirección de correo electrónico
        const user = await User.findOne({ where: { email_user: email } });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario con la nueva contraseña hasheada
        user.password_user = hashedPassword;
        await user.save();

        // Eliminar los códigos de recuperación anteriores
        await RecoveryCode.destroy({ where: { id_user: user.id_user } });

        res.status(200).json({ message: "Contraseña actualizada exitosamente." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

const verifyRecoveryCode = async (email, recoveryCode) => {
    try {
        const user = await User.findOne({ where: { email_user: email } });
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }
        const recoveryCodeData = await RecoveryCode.findOne({
            where: { id_user: user.id_user, code: recoveryCode },
            order: [['createdAt', 'DESC']]
        });
        if (!recoveryCodeData) {
            throw new Error("Código de recuperación incorrecto.");
        }
        const now = moment();
        const expirationDate = moment(recoveryCodeData.expiration);
        if (now.isAfter(expirationDate)) {
            throw new Error("El código de recuperación ha vencido.");
        }
        // Código de recuperación válido
    } catch (error) {
        throw error;
    }
};





