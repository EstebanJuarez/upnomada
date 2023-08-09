import User from "../models/userModel.js";
import db from "../database/db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Stripe from "stripe";

import { Op } from "sequelize";

const stripe = new Stripe("sk_test_51NaQrxAzaBsx8xim1OGUlxBkATvhc38jcP7pcG0Pi5D7MoBfoVIV42hmvZDbMbvTF2F2tQrvtV9qGflefySq6Lr700uyv3vNUq");


export const createUser = async (req, res) => {
  const { nombre_user, apellido_user, password_user, email_user, role, telefono_user } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email_user }],
      },
    });

    if (existingUser) {
      return res.status(409).send('El usuario o correo electrónico ya existe');
    }

    // Crea el usuario
    const user = await User.create({
      nombre_user,
      apellido_user,
      telefono_user,
      password_user,
      email_user,
      role,
    });

    // Retorna el usuario creado
    res.status(201).send({ ...user.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al crear el usuario');
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre_user, apellido_user, role, email_user, telefono_user, password_user } = req.body;

  try {
    const userToUpdate = await User.findOne({ where: { id_user: id } });

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (nombre_user) userToUpdate.nombre_user = nombre_user;
    if (telefono_user) userToUpdate.telefono_user = telefono_user;
    if (apellido_user) userToUpdate.apellido_user = apellido_user;
    if (email_user) userToUpdate.email_user = email_user;
    if (role) userToUpdate.role = role;

    // Si el campo de contraseña se proporciona, realiza el hashing y actualiza la contraseña
    if (password_user) {
      const hashedPassword = await bcrypt.hash(password_user, 10);
      userToUpdate.password_user = hashedPassword;
    }

    await userToUpdate.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id_user: id },
    });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id_user: id } });

    if (!user) {
      return res.status(404).json({ error: `No existe ningún usuario con ID ${id}` });
    }

    await User.destroy({ where: { id_user: id } });

    return res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error(`Error al borrar el usuario con ID ${id}:`, error);
    return res.status(500).json({ error: `Error al borrar el usuario con ID ${id}` });
  }
};


//registrar al publico


export const registerUser = async (req, res) => {
  console.log("registerUser");
  const { nombre_user, apellido_user, password_user, email_user, telefono_user } = req.body;
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email_user }],
      },
    });

    if (existingUser) {
      return res.status(409).send('El usuario o correo electrónico ya existe');
    }

    // Crea el usuario
    const user = await User.create({
      nombre_user,
      apellido_user,
      telefono_user,
      email_user,
      password_user,
      role: 'viewer',
    });

    const customer = await stripe.customers.create({
      email: email_user,
      name: `${nombre_user} ${apellido_user}`,
      phone: telefono_user,
      // Otros datos del cliente pueden ir aquí, como dirección, etc.
    });

    // Guardar el customerId de Stripe en la base de datos del usuario
    user.customer_id = customer.id;
    await user.save();

    res.status(201).send("Usuario creado");
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al crear el usuario');
  }
};

