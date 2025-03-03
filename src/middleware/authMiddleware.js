// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import jwt from 'jsonwebtoken'

  const verificarToken = (req, res, next) => {
    const authorization = req.header('Authorization')

    if (!authorization)
      return res.status(401).json({ msg: 'Token faltante '})

    let token = ''

    // Si el token viene con el formato 'Bearer token', debemos extraerlo
    if (authorization.startsWith("Bearer ")) {
      token = authorization.slice(7, authorization.length); // Eliminar 'Bearer ' y dejar solo el token
    }

    if (!token) {
      return res.status(401).json({ msg: 'Acceso denegado, no hay token' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.usuario = decoded // Guardar datos del usuario en la request

      next()
    } catch (error) {
      res.status(401).json({ msg: 'Token inválido' })
    }
  }/////////////////////////////////////////////////////////////////////////

  export default verificarToken