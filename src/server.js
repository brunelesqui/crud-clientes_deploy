// MIT License
// Copyright (c) 2025 @brunelesqui
// Ver el archivo LICENSE para más detalles.

  import express from 'express'
  import cors from 'cors'
  import dotenv from 'dotenv'

  import clienteRoutes from './routes/clienteRoutes.js'
  import authRoutes from './routes/authRoutes.js'

  import { ConectarDB } from './config/db.js'

  dotenv.config()

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use(express.static('dist'))

  app.use('/api/clientes', clienteRoutes)
  app.use('/api/auth', authRoutes)

  const PORT = process.env.PORT || 5000
  const SERVERNAME = process.env.SERVERNAME

  ConectarDB()

  app.get('/', (req, res) => {
    res.send(`API ${SERVERNAME} funcionando 🚀`)
  })

  app.listen(PORT, () => {
    console.log(`Servidor ${SERVERNAME} corriendo en http://localhost:${PORT}`)
  })

