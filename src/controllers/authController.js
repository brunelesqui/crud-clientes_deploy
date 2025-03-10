// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import Usuario from '../models/Usuario.js'

  import bcrypt from 'bcryptjs'
  import jwt from 'jsonwebtoken'
  import { validationResult } from 'express-validator'

  // Registrar usuario
  export const registrarUsuario = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }

    const { nombre, email, password } = req.body

    try {
      // Verificar si el usuario ya existe
      let usuario = await Usuario.findOne({ email })
      if (usuario) {
        return res.status(400).json({ msg: 'El usuario ya está registrado' })
      }

      // Crear nuevo usuario
      usuario = new Usuario({
        nombre,
        email,
        password,
      })

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10)
      usuario.password = await bcrypt.hash(password, salt)

      // Guardar en la base de datos
      await usuario.save()

      res.json({ msg: 'Usuario registrado correctamente' })
    } catch (error) {
      console.error(error)
      res.status(500).send('Error en el servidor')
    }
  }//////////////////////////////////////////////////////////////////////////

  // Login de usuario
  export const loginUsuario = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }

    const { email, password } = req.body

    try {
      // Verificar si el usuario existe
      let usuario = await Usuario.findOne({ email })
      if (!usuario) {
        return res.status(400).json({ msg: 'Credenciales incorrectas' })
      }

      // Verificar la contraseña
      const passwordCorrecto = await bcrypt.compare(password, usuario.password)
      if (!passwordCorrecto) {
        return res.status(400).json({ msg: 'Credenciales incorrectas' })
      }

      // Crear JWT
      const token = jwt.sign(
        { id: usuario._id, nombre: usuario.nombre, rol: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      )

      res.json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).send('Error en el servidor')
    }
  }/////////////////////////////////////////////////////////////////////////////

  export const getProfile = async (req, res) => {
    try {
      const user = await Usuario.findById(req.usuario.id).select("-password");
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  }///////////////////////////////////////////////////////////////////////////
