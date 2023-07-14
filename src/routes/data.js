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
    let number = 1
    console.log(number)
    let data = {
        "number":number
    }
    fs.writeFileSync(join(PATH, '../public/data.json'), JSON.stringify(data))
    res.json(data)
})

export default router