import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
// este middleware no controla la sucripcion, solo que exista el usuario y que tiene token 

const loggedAuthMiddleware =  async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send({ error: "Token no proporcionado." });
    }
    const decoded = jwt.verify(token, process.env.MI_CLAVE);
    req.user = decoded.user;
    req.user.id = decoded.user.id;
    const userFromDB = await User.findByPk(req.user.id);
    if (!userFromDB) {
      return res.status(401).send({ error: "Usuario no encontrado." });
    }
      next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("El token ha expirado.");
      res.status(401).send("Token expirado.");
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.log("Token no válido.");
      res.status(401).send("Token no válido.");
    } else {
      // Cualquier otro error
      console.log(err);
      res.status(500).send("Error en la autenticación.");
    }
  }
};

export default loggedAuthMiddleware;
