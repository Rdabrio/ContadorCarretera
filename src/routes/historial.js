import { Router } from "express"

const router = Router()

//Definir el get de la pagina historial
router.get('/historial', (req, res) => {
    //Renderiza una pagina html
    res.render('historial')
})

export default router