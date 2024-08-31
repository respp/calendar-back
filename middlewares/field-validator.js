const { response } = require('express')
const { validationResult } = require('express-validator')

const fieldValidator = (req, res=response, next)=>{
    
    // manejo de errores, los meto en req
    const errors = validationResult( req )
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        })
    }
    next()
}

module.exports = {
    fieldValidator
}