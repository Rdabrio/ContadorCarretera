import { Router } from "express";
import bodyParser from 'body-parser'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'fs'

const PATH = dirname(fileURLToPath(import.meta.url))
const router = Router()


router.get('/data', (req, res) => {
    let rawdata = fs.readFileSync(join(PATH, '../public/data.json'))
    let data = JSON.parse(rawdata)
    res.json(data)
})

router.post('/data', bodyParser.json(), (req, res) => {
    let number = req.body.number
    console.log(req.body)
    let data = {
        "number":number
    }
    fs.writeFileSync(join(PATH, '../public/data.json'), JSON.stringify(data))

    /* Funciona para añadir un dato mas al json y guardarlo
    let rawdata = fs.readFileSync(join(PATH, '../public/historialData.json'))
    let historialData = JSON.parse(rawdata)
    console.log(historialData)

    historialData.push({"nombre": "R", "fecha": "22-07-2023"})
    fs.writeFileSync(join(PATH, '../public/historialData.json'), JSON.stringify(historialData))
    rawdata = fs.readFileSync(join(PATH, '../public/historialData.json'))
    historialData = JSON.parse(rawdata)
    console.log(historialData)
    */
    res.json(data)
})

export default router