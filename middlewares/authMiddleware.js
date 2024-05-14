const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
  // Obtener el token de la cabecera de autorización
  const token = req.headers.authorization;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar el token y extraer el payload (userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // Permitir continuar con la siguiente función
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido' });
  }
};