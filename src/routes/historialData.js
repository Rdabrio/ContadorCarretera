import { Router } from "express";
import bodyParser from 'body-parser'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'fs'

const PATH = dirname(fileURLToPath(import.meta.url))
const router = Router()

router.get('/historialData', (req, res) => {
    let rawdata = fs.readFileSync(join(PATH, '../public/historialData.json'))
    let data = JSON.parse(rawdata)
    res.json(data)
})

router.post('/historialData', bodyParser.json(), (req, res) => {
    let bodyData = req.body
    let rawdata = fs.readFileSync(join(PATH, '../public/historialData.json'))
    let data = JSON.parse(rawdata)

    data.push(bodyData)
    fs.writeFileSync(join(PATH, '../public/historialData.json'), JSON.stringify(data))
    res.json(data)
})

export default router