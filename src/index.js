import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import inicioRoute from './routes/inicio.js'
import historialRoute from './routes/historial.js'
import dataRoute from './routes/data.js'
import historialDataRoute from './routes/historialData.js'

//Obtener path absoluto de la carpeta
const PATH = dirname(fileURLToPath(import.meta.url))
const PORT = 3000;
const app = express()

//Usar ejs
app.set('view engine', 'ejs')
app.set('views', join(PATH, 'views'))

//Usar las rutas creadas
app.use(inicioRoute)
app.use(historialRoute)
app.use(dataRoute)
app.use(historialDataRoute)

//Usar css
app.use(express.static(join(PATH, 'public')))

//Iniciar la conexion
app.listen(PORT)
console.log(`Server listening on port ${PORT}`)

