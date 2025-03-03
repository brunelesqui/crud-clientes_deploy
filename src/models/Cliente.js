// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import mongoose from 'mongoose'

  const ClienteSchema = new mongoose.Schema(
    {
      nombre: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      telefono: {
        type: String,
        required: false,
        trim: true,
      },
      empresa: {
        type: String,
        required: false,
        trim: true,
      },
      notas: {
        type: String,
        required: false,
      },
    },
    { timestamps: true } // Agrega createdAt y updatedAt automáticamente
  )

  export default mongoose.model('Cliente', ClienteSchema)
