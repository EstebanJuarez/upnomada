import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import localStorage from "local-storage";
dotenv.config();


const miClave = process.env.MI_CLAVE;

export const login = async (req, res) => {
    try {
        const { email_user, password_user } = req.body;

        console.log(email_user);
        console.log(password_user);

        const user = await User.findOne({ where: {   
            email_user:email_user 
     //       role: { [Op.or]: ['proveedor', 'admin'] } // Agregar condición del rol

        } });
        console.log(user);
        if (!user) {
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }
        const isPasswordValid = await bcrypt.compare(password_user, user.password_user);
        if (!isPasswordValid) {
    
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }

        // console.log("iniciado")
        // res.status(200).send({ message: 'Inicio de sesión exitoso' });
        const payload = {
            user: {
                nombre:user.nombre_user,
                apellido: user.apellido_user,
                id: user.id_user,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            miClave,
            {
                expiresIn:86400
            },
            (err, token) => {
                if (err) throw err;

                res.json({ token });
          
            }
        );
    } catch (error) {
        console.log("error " + error)
        return res.status(401).send({ error: 'Error en la bd' + error });

    }

};


