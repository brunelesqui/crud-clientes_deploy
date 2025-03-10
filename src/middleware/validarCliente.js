// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import { body, validationResult } from 'express-validator'

  // Middleware de validación
  export const validarCliente = [
    body('nombre')
      .notEmpty().withMessage('El nombre es obligatorio')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    
    body('email')
      .notEmpty().withMessage('El email es obligatorio')
      .isEmail().withMessage('Debe ser un email válido'),

    body('telefono')
      .optional()
      .isNumeric().withMessage('El teléfono debe contener solo números'),

    body('empresa')
      .optional()
      .isString().withMessage('La empresa debe ser un texto'),

    body('notas')
      .optional()
      .isString().withMessage('Las notas deben ser un texto'),

    // Middleware para manejar los errores
    (req, res, next) => {
      const errores = validationResult(req)
      if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
      }
      next()
    }
  ]

