// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import express from 'express'

  import {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente,
  } from '../controllers/clienteController.js'

  import verificarToken from "../middleware/authMiddleware.js";
  import verificarRol from "../middleware/roleMiddleware.js";

  const router = express.Router()

  // Solo los ADMIN pueden crear, modificar y eliminar clientes
  router.post("/", verificarToken, verificarRol(['admin']), crearCliente)
  router.put("/:id", verificarToken, verificarRol(['admin']), actualizarCliente)
  router.delete("/:id", verificarToken, verificarRol(['admin']), eliminarCliente)

  // Usuarios y Admins pueden ver los clientes
  router.get("/", verificarToken, obtenerClientes)
  router.get("/:id", verificarToken, obtenerClientePorId)

  export default router
