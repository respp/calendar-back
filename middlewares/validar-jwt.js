const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT =(req, res, next)=>{

    // x-token headers
    const token = req.header('x-token')

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        console.log(payload)
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no válido'
        })
    }

    next()
}

module.exports = {
    validateJWT
}