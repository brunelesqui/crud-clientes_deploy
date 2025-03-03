// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import mongoose from 'mongoose'
  import dotenv from 'dotenv'

  dotenv.config()

  const MONGO_URI = process.env.MONGO_URI

  export const ConectarDB = () => {
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log('MongoDB conectado'))
      .catch((error) => console.log(error))
  }////////////////////////////////////////////////