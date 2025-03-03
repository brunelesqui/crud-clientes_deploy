// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import express from 'express'
  import { body } from 'express-validator'

  import { 
    registrarUsuario, 
    loginUsuario,
    getProfile } from '../controllers/authController.js'

  import authMiddleware from '../middleware/authMiddleware.js'

  const router = express.Router()

  // Rutas de autenticación
  router.post(
    '/register',
    [
      body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
      body('email').isEmail().withMessage('Email inválido'),
      body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    ],
    registrarUsuario
  )

  router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Email inválido'),
      body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ],
    loginUsuario
  )

  router.get('/profile', authMiddleware, getProfile)

  export default router
