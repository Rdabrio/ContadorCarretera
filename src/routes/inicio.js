import { Router } from "express"

const router = Router()

//Definir el get de la pagina principal
router.get('/', (req, res) => {
    //Renderiza una pagina html
    res.render('index')
})

export default router