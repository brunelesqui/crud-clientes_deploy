// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import Cliente from '../models/Cliente.js'

  // Crear un nuevo cliente
  export const crearCliente = async (req, res) => {
    try {
      const nuevoCliente = new Cliente(req.body)
      await nuevoCliente.save()
      res.status(201).json(nuevoCliente)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }//////////////////////////////////////////////////

  // Obtener todos los clientes
  export const obtenerClientes = async (req, res) => {
    try {
      const clientes = await Cliente.find()
      res.status(200).json(clientes)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los clientes' })
    }
  }///////////////////////////////////////////////////////////////////

  // Obtener un cliente por ID
  export const obtenerClientePorId = async (req, res) => {
    try {
      const cliente = await Cliente.findById(req.params.id)
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' })
      }
      res.status(200).json(cliente)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el cliente' })
    }
  }////////////////////////////////////////////////////////////////////

  // Actualizar un cliente
  export const actualizarCliente = async (req, res) => {
    try {
      const clienteActualizado = await Cliente.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!clienteActualizado) {
        return res.status(404).json({ error: 'Cliente no encontrado' })
      }
      res.status(200).json(clienteActualizado)
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el cliente' })
    }
  }/////////////////////////////////////////////////////////////////////

  // Eliminar un cliente
  export const eliminarCliente = async (req, res) => {
    try {
      const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id)
      if (!clienteEliminado) {
        return res.status(404).json({ error: 'Cliente no encontrado' })
      }
      res.status(200).json(clienteEliminado)
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el cliente' })
    }
  }///////////////////////////////////////////////////////////////////////////
