/*
    Rutas de usuario / auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { fieldValidator } = require('../middlewares/field-validator')
const { validateJWT } = require('../middlewares/validar-jwt')

const { createUser, renewToken, loginUser } = require('../controllers/auth')

router.post(
    '/new',
    [ //middlewares
        check('name', 'el nombre es obligatorio').not().isEmpty(), 
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({min:6}),
        fieldValidator
     ], 
    createUser
)

router.post(
    '/',
    [ //middlewares
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({min:6}),
        fieldValidator
     ],
    loginUser
)

router.get('/renew', validateJWT, renewToken)

module.exports = router