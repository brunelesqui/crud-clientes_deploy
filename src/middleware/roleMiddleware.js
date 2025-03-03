// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
      if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
        return res.status(403).json({ msg: 'Acceso denegado' })
      }
      next()
    }
  }////////////////////////////////////////////////////////////////////

  export default verificarRol