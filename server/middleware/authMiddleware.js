import jwt from "jsonwebtoken";



const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).send({ error: "Token no proporcionado." });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.MI_CLAVE);

    // Asignar el usuario decodificado a la solicitud para su uso posterior
    req.user = decoded.user;
    req.user.id = decoded.user.id;
    req.user.status = decoded.user.status;
    if (req.user.status === "active") {
      next(); // Continuar con la siguiente middleware o ruta
    } else {
      // Si el usuario no está activo, enviar una respuesta 401 (No autorizado)
      res.status(402).send({ error: "Su suscripción ha vencido. Por favor, renueve su suscripción para continuar accediendo al contenido." });
    }

    // Continuar con la siguiente middleware o ruta
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

export default authMiddleware;
