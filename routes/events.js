/*
    Rutas de eventos / events
    host + /api/events
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT } = require('../middlewares/validar-jwt')
const { fieldValidator } = require('../middlewares/field-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const router = Router()

router.use( validateJWT )

//Todas tienen que pasar por validacion jwt
// Obtener eventos
router.get('/', getEvents)

// crear evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        fieldValidator
    ],
    createEvent
)

// actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        fieldValidator
    ],
    updateEvent)

// crear evento
router.delete('/:id', deleteEvent)

module.exports = router