const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

console.log(process.env.PORT)

const app = express()

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())


//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.use('*', (req, res)=>{
    res.send( path.join(__dirname, 'public/index.html') )
})

app.listen( process.env.PORT, ()=>{
    console.log('servidor corriendo en puerto '+ process.env.PORT)
})