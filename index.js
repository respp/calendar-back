const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

console.log(process.env.PORT)

const app = express()

//Base de datos
dbConnection()

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())


//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.listen( process.env.PORT, ()=>{
    console.log('servidor corriendo en puerto '+ process.env.PORT)
})