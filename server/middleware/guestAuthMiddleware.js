import jwt from "jsonwebtoken";

export const authenticateGuestToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No se ha proporcionado un token válido' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.MI_CLAVE);

    // Comprobar si el token pertenece a un usuario invitado
    if (decoded.user.role !== 'guest') {

      return res.status(401).json({ msg: 'El token no pertenece a un usuario invitado' });
    }

    // Añadir la información del usuario invitado a la solicitud para que pueda ser utilizada en las siguientes rutas
    req.user = decoded.user;
    next();

  } catch (err) {
    // Si hay algún problema con el token, enviar una respuesta de error
    res.status(401).json({ msg: 'Token no válido' });
  }
};
