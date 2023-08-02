import User from "../models/userModel.js";
import UsuariosDetalles from "../models/userDetallesModel.js";
import db from "../database/db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Pedido from "../models/pedidoModel.js";

import { Op } from "sequelize";



export const createUser = async (req, res) => {
  const { nombre_user, apellido_user, password_user, email_user, detalles, role } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email_user }],
      },
    });

    if (existingUser) {
      return res.status(409).send('El usuario o correo electrónico ya existe');
    }
    // Inicia una transacción
    const createdUser = await db.transaction(async (t) => {
      // Crea el usuario
      const user = await User.create(
        {
          nombre_user,
          apellido_user,

          password_user,
          email_user,
          role: role,
        },
        { transaction: t }
      );

      // Crea los detalles del usuario
      const userDetails = await UsuariosDetalles.create(
        {
          id_user: user.id_user,
          dni: detalles.dni,
          telefono: detalles.telefono,
          postal: detalles.postal,
          calle: detalles.calle,
          provincia: detalles.provincia,
          ciudad: detalles.ciudad,
        },
        { transaction: t }
      );

      // Retorna el usuario con sus detalles
      return { ...user.toJSON(), detalles: userDetails.toJSON() };
    });

    res.status(200).send(createdUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
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
  const { nombre_user, apellido_user, role, email_user, dni, telefono, postal, calle, provincia, ciudad, password_user } = req.body;
  console.log("log del update" + password_user);
  try {
    const userToUpdate = await User.findOne({ where: { id_user: id } });

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (nombre_user) userToUpdate.nombre_user = nombre_user;
    if (apellido_user) userToUpdate.apellido_user = apellido_user;
    if (email_user) userToUpdate.email_user = email_user;
    if (role) userToUpdate.role = role;
    if (password_user) userToUpdate.password_user = await bcrypt.hash(password_user, 10);

    await userToUpdate.save();

    const userDetailToUpdate = await UsuariosDetalles.findOne({ where: { id_user: id } });

    if (!userDetailToUpdate) {
      return res.status(404).json({ message: "User details not found" });
    }

    if (dni) userDetailToUpdate.dni = dni;
    if (telefono) userDetailToUpdate.telefono = telefono;
    if (postal) userDetailToUpdate.postal = postal;
    if (calle) userDetailToUpdate.calle = calle;
    if (provincia) userDetailToUpdate.provincia = provincia;
    if (ciudad) userDetailToUpdate.ciudad = ciudad;

    await userDetailToUpdate.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};


export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id_user: id },
      include: [
        {
          model: UsuariosDetalles,

        }
      ]
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
    await UsuariosDetalles.destroy({ where: { id_user: id } }); // Elimina el detalle del usuario

    await User.destroy({ where: { id_user: id } });

    return res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error(`Error al borrar el usuario con ID ${id}:`, error);
    return res.status(500).json({ error: `Error al borrar el usuario con ID ${id}` });
  }
};




//registrar al publico


export const registerUser = async (req, res) => {
  const { nombre_user, apellido_user, password_user, email_user, detalles } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email_user }],
      },
    });

    if (existingUser) {
      return res.status(409).send('El usuario o correo electrónico ya existe');
    }
    // Inicia una transacción
    const createdUser = await db.transaction(async (t) => {
      // Crea el usuario
      const user = await User.create(
        {
          nombre_user,
          apellido_user,

          password_user,
          email_user,
          role: 'viewer',
        },
        { transaction: t }
      );

      // Crea los detalles del usuario
      const userDetails = await UsuariosDetalles.create(
        {
          id_user: user.id_user,
          dni: detalles.dni,
          telefono: detalles.telefono,
          postal: detalles.postal,
          calle: detalles.calle,
          provincia: detalles.provincia,
          ciudad: detalles.ciudad,
        },
        { transaction: t }
      );

      // Retorna el usuario con sus detalles
      return { ...user.toJSON(), detalles: userDetails.toJSON() };
    });

    res.status(200).send(createdUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


export const createGuestUser = async (email) => {

  try {
    const user = await User.create({
      email_user: email,
      role: 'guest'
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const addDetallesGuestUser = async (req, res) => {
  const { nombre_user, apellido_user, direccion, detalles } = req.body;

  try {
    const token = req.header("x-auth-token");
    if (token) {
      const decodedToken = jwt.verify(token, process.env.MI_CLAVE);
      const idCliente = decodedToken.user.id;

      // Busca el usuario existente con la id del cliente del token
      const user = await User.findOne({ where: { id_user: idCliente } });
      if (user) {

        // Actualiza los valores del usuario
        user.nombre_user = nombre_user;
        user.apellido_user = apellido_user;
        await user.save();

        // Crea los detalles del usuario
        const detallesExisten = await UsuariosDetalles.findOne({
          where: {
            id_user: user.id_user
          }
        });
        if (detallesExisten) {

          res.status(200).send({ ...user.toJSON(), detalles: detallesExisten.toJSON() });

        } else {
          const userDetails = await UsuariosDetalles.create({
            id_user: user.id_user,
            dni: detalles.dni,
            telefono: detalles.telefono,
            postal: detalles.postal,
            calle: detalles.calle,
            provincia: detalles.provincia,
            ciudad: detalles.ciudad,
          });

          // Busca el último pedido del usuario
          const ultimoPedido = await Pedido.findOne({
            where: {
              id_cliente: idCliente,
            },
            order: [["createdAt", "DESC"]],
          });

          // Si el último pedido no tiene detalles de dirección, actualiza el pedido con los detalles de dirección recién creados.

          ultimoPedido.direccion = direccion;
          await ultimoPedido.save();


          res.status(200).send({ ...user.toJSON(), detalles: userDetails.toJSON() });
        }

        // Retorna el usuario con sus detalles
      } else {
        // Si el usuario no existe, lo crea
        const createdUser = await db.transaction(async (t) => {
          const newUser = await User.create(
            {
              nombre_user,
              apellido_user,
              password_user,
              email_user,
              role: 'viewer',
            },
            { transaction: t }
          );

          const userDetails = await UsuariosDetalles.create(
            {
              id_user: newUser.id_user,
              dni: detalles.dni,
              telefono: detalles.telefono,
              postal: detalles.postal,
              calle: detalles.calle,
              provincia: detalles.provincia,
              ciudad: detalles.ciudad,
            },
            { transaction: t }
          );

          return { ...newUser.toJSON(), detalles: userDetails.toJSON() };
        });

        res.status(200).send(createdUser);
      }
    } else {
      console.log("no token");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};



export const registerGuest = async (req, res) => {
  const { nombre_user, apellido_user, password_user, email_user, direccion, detalles } = req.body;

  try {


    const token = req.header("x-auth-token");
    if (token) {
      const decodedToken = jwt.verify(token, process.env.MI_CLAVE);
      const idCliente = decodedToken.user.id;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email_user }],
          id_user: {
            [Op.ne]: idCliente // "ne" significa "no es igual a"
          }
        },
      });


      if (existingUser) {
        return res.status(409).send('El usuario o correo electrónico ya existe');
      }
      // Busca el usuario existente con la id del cliente del token
      const user = await User.findOne({ where: { id_user: idCliente } });
      if (user) {

        // Actualiza los valores del usuario
        user.nombre_user = nombre_user;
        user.apellido_user = apellido_user;
        user.password_user = await bcrypt.hash(password_user, 10);
        user.email_user = email_user;
        user.role = 'viewer',
          await user.save();

        // Crea los detalles del usuario
        const detallesExisten = await UsuariosDetalles.findOne({
          where: {
            id_user: user.id_user
          }
        });
        if (detallesExisten) {
          console.log(detallesExisten);
          res.status(200).send({ ...user.toJSON(), detalles: detallesExisten.toJSON() });

        } else {
          const userDetails = await UsuariosDetalles.create({
            id_user: user.id_user,
            dni: detalles.dni,
            telefono: detalles.telefono,
            postal: detalles.postal,
            calle: detalles.calle,
            provincia: detalles.provincia,
            ciudad: detalles.ciudad,
          });

          // Busca el último pedido del usuario
          const ultimoPedido = await Pedido.findOne({
            where: {
              id_cliente: idCliente,
            },
            order: [["createdAt", "DESC"]],
          });

          // Si el último pedido no tiene detalles de dirección, actualiza el pedido con los detalles de dirección recién creados.

          if (!ultimoPedido.direccion) {
            ultimoPedido.direccion = direccion;
            await ultimoPedido.save();
          }

          res.status(200).send({ ...user.toJSON(), detalles: userDetails.toJSON() });
        }


        // Retorna el usuario con sus detalles
      } else {
        // Si el usuario no existe, lo crea
        const createdUser = await db.transaction(async (t) => {
          const newUser = await User.create(
            {
              nombre_user,
              apellido_user,
              password_user,
              email_user,
              role: 'viewer',
            },
            { transaction: t }
          );

          const userDetails = await UsuariosDetalles.create(
            {
              id_user: newUser.id_user,
              dni: detalles.dni,
              telefono: detalles.telefono,
              postal: detalles.postal,
              calle: detalles.calle,
              provincia: detalles.provincia,
              ciudad: detalles.ciudad,
            },
            { transaction: t }
          );

          return { ...newUser.toJSON(), detalles: userDetails.toJSON() };
        });

        res.status(200).send(createdUser);
      }
    } else {
      console.log("no token");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

