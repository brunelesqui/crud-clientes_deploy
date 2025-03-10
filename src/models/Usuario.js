// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import mongoose from 'mongoose'

  const usuarioSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { 
      type: String, 
      enum: ["admin", "usuario"], 
      default: "usuario" 
    },
    
  })

  const Usuario = mongoose.model('Usuario', usuarioSchema)
  export default Usuario
